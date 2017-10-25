import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Video } from '../shared/types/video';
import { PlaylistService } from './playlist-service/playlist.service';
import { VideoPlayerService} from './video-player-service/video-player.service';
import './video-playlist.component.scss';

@Component({
  selector: 'video-playlist',
  templateUrl: './video-playlist.component.html'
})
export class VideoPlaylistComponent {
  private videos: Video[] = null;

  constructor(private _playlistService: PlaylistService,
              private _videoPlayerService: VideoPlayerService) { }

  ngOnInit() {
    this.videos = this._playlistService.getPlaylist();
    this._videoPlayerService.loadVideo(this.videos[0], 0, false);
  }
}