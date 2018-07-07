import { Video } from './video';

export interface LoadVideoRequest {
  video: Video;
  play: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
}