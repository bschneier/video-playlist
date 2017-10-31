import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { Video } from '../../shared/types/video';
import { LoadVideoRequest} from '../../shared/types/loadVideoRequest';

@Injectable()
export class VideoPlayerService {
  private playVideoSubject: BehaviorSubject<LoadVideoRequest> = new BehaviorSubject(null);
  private currentlyPlayingSubject: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private _scrollToService: ScrollToService) { }

  loadVideo(video: Video, index: number, play: boolean): void {
    this.playVideoSubject.next({ video, play });
    this.currentlyPlayingSubject.next(index);

    const config: ScrollToConfigOptions = {
      target: 'playlistItem' + index.toString()
    };
    this._scrollToService.scrollTo(config);
  }

  getVideo(): BehaviorSubject<LoadVideoRequest> {
    return this.playVideoSubject;
  }

  getCurrentVideoIndex(): BehaviorSubject<number> {
    return this.currentlyPlayingSubject;
  }
}
