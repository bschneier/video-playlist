import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { VideoPlayerService } from '../video-player-service/video-player.service';
import { Video } from '../../shared/types/video';
import { LoadVideoRequest } from '../../shared/types/loadVideoRequest';
const videojs = require('video.js');
import 'videojs-youtube';

@Component({
  selector: 'video-player',
  templateUrl: './video-player.component.html'
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  @Output() onEnded = new EventEmitter();
  poster: string = "";
  source: string = "";
  type: string = "";
  videoSubscription: Subscription = null;
  videoPlayer: videojs.Player = null;
  videoOptions: object = {};
  isYouTube: boolean = false;
  shouldBePlaying: boolean = false;

  constructor(private _videoPlayerService: VideoPlayerService) { }

  ngOnInit() {
    this.videoPlayer = videojs('mainVideoPlayer');

    this.videoPlayer.on('ended', () => {
      this.onEnded.emit();
    });

    // YouTube videos don't play when loaded in chrome because we get
    // cross origin errors when loading ads
    this.videoPlayer.on('loadedmetadata', () => {
      if(this.videoPlayer.paused() && this.isYouTube && this.shouldBePlaying) {
        this.shouldBePlaying = false;
        this.videoPlayer.play();
      }
    });

    this.videoSubscription = this._videoPlayerService.getVideo().subscribe((value: LoadVideoRequest) => {
      if(value) {
        if(value.video.sources[0].type === "video/youtube") {
          this.isYouTube = this.shouldBePlaying = true;
          this.videoOptions = {
            techOrder: ["youtube"],
            youtube: {
              iv_load_options: 3
            }
          }
        }
        this.poster = value.video.thumbnail;
        this.videoPlayer.src(value.video.sources);

        if(value.play) {
          this.videoPlayer.play();
        }
      }
    });
  }

  ngOnDestroy() {
    this.videoSubscription.unsubscribe();
  }
}