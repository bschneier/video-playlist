import { Injectable } from '@angular/core';
import { Video } from '../../shared/types';
const imagePath = require.context('./../../../assets/images', true);
const videoPath = require.context('./../../../assets/videos', false);

@Injectable()
export class PlaylistService {
  getPlaylist(): Video[] {
    return this.shufflePlaylist([
      {
        length: 62,
        thumbnail: imagePath('./thumbnails/edmonds.png'),
        sources: [ { type: 'video/mp4', src: videoPath('./edmonds.mp4') } ],
        poster: imagePath('./edmonds.jpg'),
        title: 'Jim Edmonds Catch'
      },
      {
        length: 73,
        thumbnail: imagePath('./thumbnails/faulk.png'),
        sources: [ { type: 'video/mp4', src: videoPath('./faulk.mp4') } ],
        poster: imagePath('./faulk.jpg'),
        title: 'Marshall Faulk Touchdown Run'
      },
      {
        length: 75,
        thumbnail: imagePath('./thumbnails/beckham.png'),
        sources: [ { type: 'video/mp4', src: videoPath('./beckham.mp4') } ],
        poster: imagePath('./beckham.jpg'),
        title: 'Odell Beckham Jr. Catch'
      },
      {
        length: 49,
        thumbnail: 'https://dl.dropboxusercontent.com/s/pzijg4xkp3xhz1r/tarasenko-thumb.png?dl=1',
        sources: [ { type: 'video/mp4', src: 'https://www.dropbox.com/s/mmsxkq8wftei1cv/tarasenko.mp4?dl=1' } ],
        poster: 'https://dl.dropboxusercontent.com/s/qd42fcesiwmk6q6/tarasenko.png?dl=1',
        title: 'Vladimir Tarasenko goal'
      },
      {
        length: 41,
        thumbnail: imagePath('./thumbnails/allen.png'),
        sources: [ { type: 'video/youtube', src: 'https://www.youtube.com/watch?v=BGp8cdgVveY' } ],
        poster: imagePath('./allen.jpg'),
        title: 'Jake Allen Save'
      },
      {
        length: 91,
        thumbnail: 'https://dl.dropboxusercontent.com/s/hj26kvz0jsxhqsv/moss-thumb.png?dl=1',
        sources: [ { type: 'video/mp4', src: videoPath('./moss.mp4') } ],
        poster: 'https://dl.dropboxusercontent.com/s/d0vi7htzrtzpaxs/moss.png?dl=1',
        title: 'Randy Moss Catch'
      },
      {
        length: 25,
        thumbnail: imagePath('./thumbnails/julio-jones.png'),
        sources: [ { type: 'video/youtube', src: 'https://www.youtube.com/watch?v=uosTUGDIdx0' } ],
        poster: imagePath('./julio-jones.jpg'),
        title: 'Julio Jones Pregame Catch'
      },
      {
        length: 78,
        thumbnail: imagePath('./thumbnails/lebron.png'),
        sources: [ { type: 'video/youtube', src: 'https://www.youtube.com/watch?v=VkvTLOhm-TQ' } ],
        poster: imagePath('./lebron.jpg'),
        title: 'Lebron James Buzzer Beater'
      }
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