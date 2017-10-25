import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { VideoPlayerService } from '../video-player-service/video-player.service';
import { Video } from '../../shared/types/video';
import { LoadVideoRequest } from '../../shared/types/loadVideoRequest';
const videojs = require('video.js');

@Component({
  selector: 'video-player',
  templateUrl: './video-player.component.html'
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  poster: string = "";
  source: string = "";
  type: string = "";
  videoSubscription: Subscription = null;
  videoPlayer: videojs.Player = null;

  constructor(private _videoPlayerService: VideoPlayerService) { }

  ngOnInit() {
    this.videoPlayer = videojs('mainVideoPlayer');

    this.videoSubscription = this._videoPlayerService.getVideo().subscribe((value: LoadVideoRequest) => {
      if(value) {
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