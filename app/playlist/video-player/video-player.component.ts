import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { VideoPlayerService } from '../video-player-service/video-player.service';
import { LoadVideoRequest } from '../../shared/types';
import * as videojs from 'video.js';
import 'videojs-youtube';
import './video-player.component.scss';

// TODO: Update videojs types to resolve typescript errors and remove "as any" workarounds

@Component({
  selector: 'video-player',
  templateUrl: './video-player.component.html'
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  @Output() onEnded = new EventEmitter();
  @Output() onPlayNext = new EventEmitter();
  @Output() onPlayPrevious = new EventEmitter();
  source = '';
  type = '';
  videoSubscription: Subscription = null;
  videoPlayer: videojs.Player = null;
  videoOptions: object = {};
  nextButton: any;
  previousButton: any;
  currentVideoIsYouTube = false;
  shouldBePlaying = false;
  nextIsDisabled = false;
  previousIsDisabled = false;

  constructor(private videoPlayerService: VideoPlayerService) { }

  ngOnInit() {
    this.videoPlayer = videojs('mainVideoPlayer');

    const videojsButton = videojs.getComponent('Button');

    this.playPrevious = this.playPrevious.bind(this);
    this.playNext = this.playNext.bind(this);

    this.previousButton = (videojs as any).extend(videojsButton, {
      constructor() {
        (videojsButton as any).apply(this, arguments);
        this.addClass('vjs-icon-previous-item');
        this.controlText('Previous Video');
      },
      handleClick: this.playPrevious
    });

    this.nextButton = (videojs as any).extend(videojsButton, {
      constructor() {
        (videojsButton as any).apply(this, arguments);
        this.addClass('vjs-icon-next-item');
        this.controlText('Next Video');
      },
      handleClick: this.playNext
    });

    videojs.registerComponent('PreviousButton', this.previousButton);
    this.videoPlayer.getChild('controlBar').addChild('PreviousButton', {}, 0);
    videojs.registerComponent('NextButton', this.nextButton);
    this.videoPlayer.getChild('controlBar').addChild('NextButton', {}, 2);

    this.videoPlayer.on('ended', () => {
      this.onEnded.emit();
    });

    this.videoPlayer.on('loadedmetadata', () => {
      if (this.currentVideoIsYouTube && this.shouldBePlaying && this.videoPlayer.paused()) {
        setTimeout(() => {
          this.videoPlayer.one('click', () => {});
        }, 750);
      }
      else if (this.shouldBePlaying && this.videoPlayer.paused()) {
        this.videoPlayer.play();
      }
    });

    this.videoSubscription = this.videoPlayerService.getCurrentVideo$.subscribe((value: LoadVideoRequest) => {
      if (value) {
        this.shouldBePlaying = value.play;
        if (value.video.sources[0].type === 'video/youtube') {
          this.currentVideoIsYouTube = true;
          this.videoOptions = {
            techOrder: ['youtube'],
            youtube: {
              iv_load_options: 3
            }
          };
        }
        else {
          this.videoOptions = {};
        }

        this.videoPlayer.src(value.video.sources);
        this.videoPlayer.poster(value.video.poster);

        this.nextIsDisabled = !value.hasNext;
        this.previousIsDisabled = !value.hasPrevious;
        (this.videoPlayer as any).getChild('controlBar').getChild('NextButton')
            .toggleClass('vjs-icon-disabled', () => !value.hasNext);
        (this.videoPlayer as any).getChild('controlBar').getChild('PreviousButton')
            .toggleClass('vjs-icon-disabled', () => !value.hasPrevious);

        if (value.play) {
          this.videoPlayer.play();
        }
      }
    });
  }

  playPrevious(): void {
    if (!this.previousIsDisabled) {
      this.onPlayPrevious.emit();
    }
  }

  playNext(): void {
    if (!this.nextIsDisabled) {
      this.onPlayNext.emit();
    }
  }

  ngOnDestroy() {
    this.videoSubscription.unsubscribe();
  }
}