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
      new Video(62, [ new VideoSource('video/mp4', videoPath('./edmonds.mp4')) ],
        imagePath('./edmonds.jpg'), 'Jim Edmonds Catch'),
      new Video(73, [ new VideoSource('video/mp4', videoPath('./faulk.mp4')) ],
        imagePath('./faulk.jpg'), 'Marshall Faulk Touchdown Run'),
      new Video(75, [ new VideoSource('video/mp4', videoPath('./beckham.mp4')) ],
        imagePath('./beckham.jpg'), 'Odell Beckham Jr. Catch'),
      new Video(49, [ new VideoSource('video/youtube', 'https://www.youtube.com/watch?v=iyRGH7HDs7s') ],
        imagePath('./tarasenko.png'), 'Vladimir Tarasenko goal'),
      new Video(41, [ new VideoSource('video/youtube', 'https://www.youtube.com/watch?v=BGp8cdgVveY') ],
        imagePath('./allen.jpg'), 'Jake Allen Save'),
      new Video(91, [ new VideoSource('video/mp4', videoPath('./moss.mp4')) ],
        imagePath('./moss.png'), 'Randy Moss Catch'),
      new Video(25, [ new VideoSource('video/youtube', 'https://www.youtube.com/watch?v=uosTUGDIdx0') ],
        imagePath('./julio-jones.jpg'), 'Julio Jones Pregame Catch'),
      // new Video(78, [ new VideoSource('video/youtube', 'https://www.youtube.com/watch?v=VkvTLOhm-TQ') ],
      //   imagePath('./lebron.jpg'), 'Lebron James Buzzer Beater')
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