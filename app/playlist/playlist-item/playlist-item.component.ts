import { Component, Input } from '@angular/core';
import { VideoPlayerService } from '../video-player-service/video-player.service';
import { Video } from '../../shared/types/video';
import './playlist-item.component.scss';

@Component({
  selector: 'playlist-item',
  templateUrl: './playlist-item.component.html'
})
export class PlaylistItemComponent {
  @Input() video: Video = null;
  @Input() index = 0;
  @Input() selected = false;

  constructor(private _videoPlayerService: VideoPlayerService) {}

  playVideo() {
    this.selected = true;
    this._videoPlayerService.loadVideo(this.video, this.index, true);
  }
}
