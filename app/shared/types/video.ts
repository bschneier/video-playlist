import { VideoSource } from './videoSource';

export interface Video {
  length: number;
  poster: string;
  sources: VideoSource[];
  thumbnail: string;
  title: string;
}