import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { VideoPlayerComponent } from './video-player.component';
import { VideoPlayerService } from '../video-player-service/video-player.service';
import { Video, VideoSource } from '../../shared/types';

describe('VideoPlayerComponent', () => {
  let component: VideoPlayerComponent;
  let fixture: ComponentFixture<VideoPlayerComponent>;
  let videoPlayerService: VideoPlayerService;
  const testVideos = [
    new Video(20, 'testVideoThumnailSource1', [ new VideoSource('video/mp4', 'video-source') ],
      'poster-path1', 'regular'),
    new Video(40, 'testVideoThumnailSource2', [ new VideoSource('video/youtube', 'youtube-source') ],
      'poster-path2', 'youtube')
  ];
  const videoOptions = {
    regular: {},
    youtube: {
        techOrder: ['youtube'],
        youtube: {
          iv_load_options: 3
        }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoPlayerComponent ],
      providers: [ VideoPlayerService, ScrollToService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPlayerComponent);
    component = fixture.componentInstance;
    videoPlayerService = fixture.debugElement.injector.get(VideoPlayerService);
    fixture.detectChanges();
  });

  it('should emit event when video finishes playing', () => {
      let onEndedEventCount = 0;
      component.onEnded.subscribe(() => {
        onEndedEventCount++;
      });
      const endedEvent = new Event('ended');
      fixture.debugElement.nativeElement.querySelector('video').dispatchEvent(endedEvent);
      expect(onEndedEventCount).toEqual(1);
  });

  testVideos.forEach((value) => {
    describe(`when a ${value.title} video is loaded`, () => {
      it('should load the video sources', () => {
        const videoSourceSpy = spyOn(component.videoPlayer, 'src');
        videoPlayerService.loadVideo(value, 0, false);
        expect(videoSourceSpy).toHaveBeenCalledWith(value.sources);
      });

      it('should load the video poster', () => {
        const videoPosterSpy = spyOn(component.videoPlayer, 'poster');
        videoPlayerService.loadVideo(value, 0, false);
        expect(videoPosterSpy).toHaveBeenCalledWith(value.poster);
      });

      it('should set the correct video options', () => {
        videoPlayerService.loadVideo(value, 0, false);
        expect(component.videoOptions).toEqual(videoOptions[value.title]);
      });

      it('should play the video if the play flag is set', () => {
        const videoPlaySpy = spyOn(component.videoPlayer, 'play');
        videoPlayerService.loadVideo(value, 0, true);
        expect(videoPlaySpy).toHaveBeenCalledTimes(1);
      });

      it('should not play the video if the play flag is not set', () => {
        const videoPlaySpy = spyOn(component.videoPlayer, 'play');
        videoPlayerService.loadVideo(value, 0, false);
        expect(videoPlaySpy).not.toHaveBeenCalled();
      });
    });
  });
});