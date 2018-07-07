import { Component, Input } from '@angular/core';
import { VideoPlayerService } from '../video-player-service/video-player.service';
import { Video } from '../../shared/types';
import './playlist-item.component.scss';

@Component({
  selector: 'playlist-item',
  templateUrl: './playlist-item.component.html'
})
export class PlaylistItemComponent {
  @Input() video: Video = null;
  @Input() index = 0;
  @Input() selected = false;
  @Input() hasNext = true;
  @Input() hasPrevious = true;
  imageLoading = true;

  constructor(private videoPlayerService: VideoPlayerService) {}

  imageLoaded() {
    this.imageLoading = false;
  }

  playVideo() {
    this.selected = true;
    this.videoPlayerService.loadVideo(this.video, this.index, true, this.hasNext, this.hasPrevious );
  }
}
