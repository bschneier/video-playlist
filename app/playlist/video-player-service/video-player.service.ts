import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { Video } from '../../shared/types/video';
import { LoadVideoRequest} from '../../shared/types/loadVideoRequest';
import { IVideoPlayerService } from './video-player.service.interface';

@Injectable()
export class VideoPlayerService implements IVideoPlayerService {
  private currentVideoSubject: BehaviorSubject<LoadVideoRequest> = new BehaviorSubject(null);
  private currentVideoIndexSubject: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private scrollToService: ScrollToService) { }

  loadVideo(video: Video, index: number, play: boolean): void {
    this.currentVideoSubject.next({ video, play });
    this.currentVideoIndexSubject.next(index);

    const config: ScrollToConfigOptions = {
      target: 'playlistItem' + index.toString()
    };
    this.scrollToService.scrollTo(config);
  }

  getCurrentVideo(): BehaviorSubject<LoadVideoRequest> {
    return this.currentVideoSubject;
  }

  getCurrentVideoIndex(): BehaviorSubject<number> {
    return this.currentVideoIndexSubject;
  }
}
