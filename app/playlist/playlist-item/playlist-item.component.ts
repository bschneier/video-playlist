import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { VideoPlayerService } from '../video-player-service/video-player.service';
import { Video } from '../../shared/types/video';
import { VideoSource } from '../../shared/types/videoSource';
import './playlist-item.component.scss';

@Component({
  selector: 'playlist-item',
  templateUrl: './playlist-item.component.html'
})
export class PlaylistItemComponent {
  @Input() video: Video = null;
  @Input() index: number = 0;
  @Input() selected: boolean = false;

  constructor(private _videoPlayerService: VideoPlayerService) {}

  playVideo() {
    this.selected = true;
    this._videoPlayerService.loadVideo(this.video, this.index, true);
  }
}
