import { Video } from '../../shared/types/video';

export interface IPlaylistService {
  getPlaylist(): Video[];
}