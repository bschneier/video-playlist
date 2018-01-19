import { Video } from './video';

export class LoadVideoRequest {
  video: Video = null;
  play = false;

  constructor(video: Video, play: boolean) {
    this.video = video;
    this.play = play;
  }
}