import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LoadVideoRequest } from '../../shared/types/loadVideoRequest';
import { Video } from '../../shared/types/video';

export interface IVideoPlayerService {
  loadVideo(video: Video, index: number, play: boolean): void;
  getVideo(): BehaviorSubject<LoadVideoRequest>;
  getCurrentVideoIndex(): BehaviorSubject<number>;
}