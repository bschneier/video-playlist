import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Video } from '../shared/types/video';
import { PlaylistService } from './playlist-service/playlist.service';
import { VideoPlayerService} from './video-player-service/video-player.service';
import './video-playlist.component.scss';

@Component({
  selector: 'video-playlist',
  templateUrl: './video-playlist.component.html'
})
export class VideoPlaylistComponent implements OnInit, OnDestroy {
  private videos: Video[] = null;
  currentlyPlayingSubscription: Subscription = null;
  currentIndex = 0;
  continuousPlay = true;

  constructor(private _playlistService: PlaylistService,
              private _videoPlayerService: VideoPlayerService) { }

  ngOnInit() {
    this.videos = this._playlistService.getPlaylist();
    this._videoPlayerService.loadVideo(this.videos[0], 0, false);
    this.currentlyPlayingSubscription = this._videoPlayerService.getCurrentVideoIndex().subscribe((index) => {
      this.currentIndex = index;
    });
  }

  ngOnDestroy() {
    this.currentlyPlayingSubscription.unsubscribe();
  }

  onEnded() {
    if (this.currentIndex < this.videos.length - 1 && this.continuousPlay) {
      this._videoPlayerService.loadVideo(this.videos[this.currentIndex + 1], this.currentIndex + 1, true);
    }
  }

  onContinuousPlayToggle() {
    this.continuousPlay = !this.continuousPlay;
  }
}