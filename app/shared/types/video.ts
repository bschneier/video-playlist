import { VideoSource } from './videoSource';

export class Video {
  public length = 0;
  public poster: string = null;
  public sources: VideoSource[] = null;
  public thumbnail: string = null;
  public title: string = null;

  constructor(length: number, poster: string, sources: VideoSource[],
              thumbnail: string, title: string) {
    this.length = length;
    this.poster = poster;
    this.sources = sources;
    this.thumbnail = thumbnail;
    this.title = title;
  }
}