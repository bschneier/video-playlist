import { Injectable } from '@angular/core';
import { Video } from '../../shared/types';
import { VideoSource } from '../../shared/types';
const imagePath = require.context('./../../../assets/images', true);
const videoPath = require.context('./../../../assets/videos', false);

@Injectable()
export class PlaylistService {
  getPlaylist(): Video[] {
    return this.shufflePlaylist([
      new Video(62, imagePath('./thumbnails/edmonds.png'),
        [ new VideoSource('video/mp4', videoPath('./edmonds.mp4')) ],
        imagePath('./edmonds.jpg'), 'Jim Edmonds Catch'),
      new Video(73, imagePath('./thumbnails/faulk.png'),
        [ new VideoSource('video/mp4', videoPath('./faulk.mp4')) ],
        imagePath('./faulk.jpg'), 'Marshall Faulk Touchdown Run'),
      new Video(75, imagePath('./thumbnails/beckham.png'),
      [ new VideoSource('video/mp4', videoPath('./beckham.mp4')) ],
        imagePath('./beckham.jpg'), 'Odell Beckham Jr. Catch'),
      new Video(49, 'https://dl.dropboxusercontent.com/s/pzijg4xkp3xhz1r/tarasenko-thumb.png?dl=1',
        [ new VideoSource('video/youtube', 'https://www.youtube.com/watch?v=iyRGH7HDs7s') ],
        'https://dl.dropboxusercontent.com/s/qd42fcesiwmk6q6/tarasenko.png?dl=1', 'Vladimir Tarasenko goal'),
      new Video(41, imagePath('./thumbnails/allen.png'),
        [ new VideoSource('video/youtube', 'https://www.youtube.com/watch?v=BGp8cdgVveY') ],
        imagePath('./allen.jpg'), 'Jake Allen Save'),
      new Video(91, 'https://dl.dropboxusercontent.com/s/hj26kvz0jsxhqsv/moss-thumb.png?dl=1',
        [ new VideoSource('video/mp4', videoPath('./moss.mp4')) ],
        'https://dl.dropboxusercontent.com/s/d0vi7htzrtzpaxs/moss.png?dl=1', 'Randy Moss Catch'),
      new Video(25, imagePath('./thumbnails/julio-jones.png'),
        [ new VideoSource('video/youtube', 'https://www.youtube.com/watch?v=uosTUGDIdx0') ],
        imagePath('./julio-jones.jpg'), 'Julio Jones Pregame Catch'),
      new Video(78, imagePath('./thumbnails/lebron.png'),
        [ new VideoSource('video/youtube', 'https://www.youtube.com/watch?v=VkvTLOhm-TQ') ],
        imagePath('./lebron.jpg'), 'Lebron James Buzzer Beater')
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