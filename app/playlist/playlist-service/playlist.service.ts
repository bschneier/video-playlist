import { Injectable } from '@angular/core';
import { Video } from '../../shared/types/video';
import { VideoSource } from '../../shared/types/videoSource';
import { IPlaylistService } from './playlist.service.interface';
const imagePath = require.context('./../../../assets/images', false);
const videoPath = require.context('./../../../assets/videos', false);

@Injectable()
export class PlaylistService implements IPlaylistService {

  getPlaylist(): Video[] {
    const muriloVideo = './murilo.mp4';
    return this.shufflePlaylist([
      new Video(4, [ new VideoSource('video/youtube', 'https://www.youtube.com/watch?v=uuYNqalkDdI') ],
        imagePath('./chase-budinger.png'), 'Chase Budinger Bounce'),
      new Video(19, [ new VideoSource('video/mp4', videoPath(muriloVideo)) ],
        imagePath('./murilo.png'), 'Murilo Bounce'),
      new Video(42, [ new VideoSource('video/mp4', 'https://www.dropbox.com/s/caulkc78v8bfnxo/grbic.mp4?dl=1') ],
        imagePath('./grbic.png'), 'Vladimir Grbic great save and house'),
      new Video(49, [ new VideoSource('video/mp4', videoPath('./tarasenko.mp4')) ],
        imagePath('./tarasenko.png'), 'Vladimir Tarasenko goal'),
      new Video(41, [ new VideoSource('video/youtube', 'https://www.youtube.com/watch?v=Amf7Qu4pC8c') ],
        imagePath('./giba.png'), 'Giba Digs'),
      new Video(28, [ new VideoSource('video/mp4', 'https://www.dropbox.com/s/ygqeoi9pimrd3xr/dante.mp4?dl=1') ],
        imagePath('./dante.png'), 'Dante Bounce'),
      new Video(241, [ new VideoSource('video/mp4', 'https://www.dropbox.com/s/64fgvj887i9wa5f/spikes.mp4?dl=1') ],
        imagePath('./spikes.png'), 'Face shots')
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