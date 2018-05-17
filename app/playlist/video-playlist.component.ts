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
  videos: Video[] = null;
  currentIndex$: Subscription = null;
  currentIndex = 0;
  continuousPlay = true;

  constructor(private playlistService: PlaylistService,
              private videoPlayerService: VideoPlayerService) { }

  ngOnInit() {
    this.videos = this.playlistService.getPlaylist();
    this.videoPlayerService.loadVideo(this.videos[0], 0, false);
    this.currentIndex$ = this.videoPlayerService.getCurrentVideoIndex$.subscribe((index) => {
      this.currentIndex = index;
    });
  }

  ngOnDestroy() {
    this.currentIndex$.unsubscribe();
  }

  onEnded() {
    if (this.currentIndex < this.videos.length - 1 && this.continuousPlay) {
      this.videoPlayerService.loadVideo(this.videos[this.currentIndex + 1], this.currentIndex + 1, true);
    }
  }

  onContinuousPlayToggle() {
    this.continuousPlay = !this.continuousPlay;
  }
}