import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { Video } from '../../shared/types';
import { LoadVideoRequest} from '../../shared/types';

@Injectable()
export class VideoPlayerService {
  private currentVideoSubject: BehaviorSubject<LoadVideoRequest> = new BehaviorSubject(null);
  private currentVideoIndexSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public getCurrentVideo$: Observable<LoadVideoRequest> = this.currentVideoSubject.asObservable();
  public getCurrentVideoIndex$: Observable<number> = this.currentVideoIndexSubject.asObservable();

  constructor(private scrollToService: ScrollToService) { }

  public loadVideo(video: Video, index: number, play: boolean): void {
    this.currentVideoSubject.next({ video, play });
    this.currentVideoIndexSubject.next(index);

    const config: ScrollToConfigOptions = {
      target: 'playlistItem' + index.toString()
    };
    this.scrollToService.scrollTo(config);
  }
}