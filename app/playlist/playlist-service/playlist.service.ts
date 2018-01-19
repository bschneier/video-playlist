import { Injectable } from '@angular/core';
import { Video } from '../../shared/types/video';
import { VideoSource } from '../../shared/types/videoSource';

@Injectable()
export class PlaylistService {

  constructor() { }

  getPlaylist(): Video[] {
    return this.shufflePlaylist([
      new Video(4, [ new VideoSource('video/youtube', 'https://www.youtube.com/watch?v=uuYNqalkDdI') ],
        'https://www.dropbox.com/s/zztwb841hdoflgs/chase-budinger.png?dl=1', 'Chase Budinger Bounce'),
      new Video(19, [ new VideoSource('video/mp4', 'https://www.dropbox.com/s/2xquih811up34nz/murilo.mp4?dl=1') ],
        'https://www.dropbox.com/s/3y75e8zi5nx9qon/murilo.png?dl=1', 'Murilo Bounce'),
      new Video(42, [ new VideoSource('video/mp4', 'https://www.dropbox.com/s/caulkc78v8bfnxo/grbic.mp4?dl=1') ],
        'https://www.dropbox.com/s/mhvyrk6fwyifcxt/grbic.png?dl=1', 'Vladimir Grbic great save and house'),
      new Video(49, [ new VideoSource('video/mp4', 'https://www.dropbox.com/s/mmsxkq8wftei1cv/tarasenko.mp4?dl=1') ],
        'https://www.dropbox.com/s/pzijg4xkp3xhz1r/tarasenko.png?dl=1', 'Vladimir Tarasenko goal'),
      new Video(41, [ new VideoSource('video/youtube', 'https://www.youtube.com/watch?v=Amf7Qu4pC8c') ],
        'https://www.dropbox.com/s/xy1zspbajsh2p7n/giba.png?dl=1', 'Giba Digs'),
      new Video(28, [ new VideoSource('video/mp4', 'https://www.dropbox.com/s/ygqeoi9pimrd3xr/dante.mp4?dl=1') ],
        'https://www.dropbox.com/s/d9xeinwy2h6i9yw/dante.png?dl=1', 'Dante Bounce'),
      new Video(241, [ new VideoSource('video/mp4', 'https://www.dropbox.com/s/64fgvj887i9wa5f/spikes.mp4?dl=1') ],
        'https://www.dropbox.com/s/h8btyvj11trqn3q/spikes.png?dl=1', 'Face shots')
    ]);
  }

  shufflePlaylist(playlist: Video[]): Video[] {
    for (let i = playlist.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = playlist[i];
        playlist[i] = playlist[j];
        playlist[j] = temp;
    }
    return playlist;
  }
}