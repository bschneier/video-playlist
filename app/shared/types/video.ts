import { VideoSource } from './videoSource';

export class Video {
  public length: number = 0;
  public sources: VideoSource[] = null;
  public thumbnail: string = null;
  public title: string = null;

  constructor(length: number, sources: VideoSource[], thumbnail: string, title: string) {
      this.length = length;
      this.sources = sources;
      this.thumbnail = thumbnail;
      this.title = title;
    }
}