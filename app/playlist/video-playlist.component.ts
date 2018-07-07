import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Video } from '../shared/types';
import { PlaylistService } from './playlist-service/playlist.service';
import { VideoPlayerService} from './video-player-service/video-player.service';
import './video-playlist.component.scss';

@Component({
  selector: 'video-playlist',
  templateUrl: './video-playlist.component.html'
})
export class VideoPlaylistComponent implements OnInit, OnDestroy {
  videos: Video[] = null;
  currentIndexSubscription: Subscription = null;
  currentIndex = 0;
  continuousPlay = true;
  lastIndex = 0;

  constructor(private playlistService: PlaylistService,
              private videoPlayerService: VideoPlayerService) { }

  ngOnInit() {
    this.videos = this.playlistService.getPlaylist();
    this.lastIndex = this.videos.length - 1;
    this.videoPlayerService.loadVideo(this.videos[0], 0, false, true, false);
    this.currentIndexSubscription = this.videoPlayerService.getCurrentVideoIndex$.subscribe((index) => {
      this.currentIndex = index;
    });
  }

  ngOnDestroy() {
    this.currentIndexSubscription.unsubscribe();
  }

  onEnded() {
    if (this.currentIndex < this.videos.length - 1 && this.continuousPlay) {
      this.playNextVideo();
    }
  }

  playNextVideo() {
    const nextIndex = this.currentIndex + 1;
    this.videoPlayerService.loadVideo(this.videos[nextIndex], nextIndex, true, nextIndex !== this.lastIndex, true);
  }

  playPreviousVideo() {
    const previousIndex = this.currentIndex - 1;
    this.videoPlayerService.loadVideo(this.videos[previousIndex], previousIndex, true, true, previousIndex !== 0);
  }

  onContinuousPlayToggle() {
    this.continuousPlay = !this.continuousPlay;
  }
}