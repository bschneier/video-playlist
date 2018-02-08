import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { VideoPlayerService } from '../video-player-service/video-player.service';
import { LoadVideoRequest } from '../../shared/types/loadVideoRequest';
import * as videojs from 'video.js';
import 'videojs-youtube';
import './video-player.component.scss';

@Component({
  selector: 'video-player',
  templateUrl: './video-player.component.html'
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  @Output() onEnded = new EventEmitter();
  source = '';
  type = '';
  videoSubscription: Subscription = null;
  videoPlayer: videojs.Player = null;
  videoOptions: object = {};
  currentVideoIsYouTube = false;
  shouldBePlaying = false;

  constructor(private _videoPlayerService: VideoPlayerService) { }

  ngOnInit() {
    this.videoPlayer = videojs('mainVideoPlayer');

    this.videoPlayer.on('ended', () => {
      this.onEnded.emit();
    });

    // YouTube videos don't play when loaded in chrome because we get
    // cross origin errors when loading ads, so we need to manually
    // play them after they load
    this.videoPlayer.on('loadedmetadata', () => {
      if (this.videoPlayer.paused() && this.currentVideoIsYouTube && this.shouldBePlaying) {
        this.shouldBePlaying = false;
        this.videoPlayer.play();
      }
    });

    this.videoSubscription = this._videoPlayerService.getVideo().subscribe((value: LoadVideoRequest) => {
      if (value) {
        if (value.video.sources[0].type === 'video/youtube') {
          this.currentVideoIsYouTube = true;
          this.shouldBePlaying = value.play;
          this.videoOptions = {
            techOrder: ['youtube'],
            youtube: {
              iv_load_options: 3
            }
          };
        }

        this.videoPlayer.src(value.video.sources);
        this.videoPlayer.poster(value.video.thumbnail);

        if (value.play) {
          this.videoPlayer.play();
        }
      }
    });
  }

  ngOnDestroy() {
    this.videoSubscription.unsubscribe();
  }
}