import { Injectable } from '@angular/core';
import { Video } from '../../shared/types/video';
import { VideoSource } from '../../shared/types/videoSource';
import { IPlaylistService } from './playlist.service.interface';
const imagePath = require.context('./../../../assets/images', false);
const videoPath = require.context('./../../../assets/videos', false);

@Injectable()
export class PlaylistService implements IPlaylistService {

  getPlaylist(): Video[] {
    return this.shufflePlaylist([
      new Video(4, [ new VideoSource('video/mp4', videoPath('./chase-budinger.mp4')) ],
        imagePath('./chase-budinger.png'), 'Chase Budinger Spike'),
      new Video(19, [ new VideoSource('video/youtube', 'https://www.youtube.com/watch?v=mtpx0PjrjoY') ],
        imagePath('./murilo.png'), 'Murilo Spike'),
      new Video(42, [ new VideoSource('video/mp4', videoPath('./grbic.mp4')) ],
        imagePath('./grbic.png'), 'Vladimir Grbic great save and block'),
      new Video(49, [ new VideoSource('video/youtube', 'https://www.youtube.com/watch?v=iyRGH7HDs7s') ],
        imagePath('./tarasenko.png'), 'Vladimir Tarasenko goal'),
      new Video(44, [ new VideoSource('video/youtube', 'https://www.youtube.com/watch?v=DojCj2xxwjA') ],
        imagePath('./giba.png'), 'Giba Spike'),
      new Video(28, [ new VideoSource('video/mp4', videoPath('./dante.mp4')) ],
        imagePath('./dante.png'), 'Dante Spike'),
      new Video(25, [ new VideoSource('video/youtube', 'https://www.youtube.com/watch?v=uosTUGDIdx0') ],
        imagePath('./julio-jones.jpg'), 'Julio Jones Pregame Catch')
    ]);
  }

  private shufflePlaylist(playlist: Video[]): Video[] {
    for (let i = playlist.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = playlist[i];
        playlist[i] = playlist[j];
        playlist[j] = temp;
    }
    return playlist;
  }
}