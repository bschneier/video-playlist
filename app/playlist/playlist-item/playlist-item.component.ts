import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { VideoPlayerService } from '../video-player-service/video-player.service';
import { Video } from '../../shared/types/video';
import { VideoSource } from '../../shared/types/videoSource';
import './playlist-item.component.scss';

@Component({
  selector: 'playlist-item',
  templateUrl: './playlist-item.component.html'
})
export class PlaylistItemComponent implements OnInit, OnDestroy {
  @Input() video: Video = null;
  @Input() index: number = 0;
  currentlyPlayingSubscription: Subscription = null;
  selected: boolean = false;

  constructor(private _videoPlayerService: VideoPlayerService) {}

  ngOnInit() {
    this.currentlyPlayingSubscription = this._videoPlayerService.getCurrentVideoIndex().subscribe((index) => {
      this.selected = this.index === index ? true : false;
    });
  }

  ngOnDestroy() {
    this.currentlyPlayingSubscription.unsubscribe();
  }

  playVideo() {
    this.selected = true;
    this._videoPlayerService.loadVideo(this.video, this.index, true);
  }
}
