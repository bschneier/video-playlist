import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { VideoPlaylistComponent } from './video-playlist.component';
import { PlaylistService } from './playlist-service/playlist.service';
import { VideoPlayerService } from './video-player-service/video-player.service';
import { VideoPlayerComponent } from './video-player/video-player.component';

describe('VideoPlaylistComponent', () => {
  let component: VideoPlaylistComponent;
  let fixture: ComponentFixture<VideoPlaylistComponent>;
  let getPlaylistSpy: jasmine.Spy;
  let loadVideoSpy: jasmine.Spy;
  const testVideos = [
    {
      length: 20,
      thumbnail: 'testVideoThumnailSource1',
      sources: [ { type: 'video/mp4', src: 'video-source1' } ],
      poster: 'poster-path1',
      title: 'video description1'
    },
    {
      length: 40,
      thumbnail: 'testVideoThumnailSource2',
      sources: [ { type: 'video/mp4', src: 'video-source2' } ],
      poster: 'poster-path2',
      title: 'video description2'
    },
    {
      length: 45,
      thumbnail: 'testVideoThumnailSource3',
      sources: [ { type: 'video/mp4', src: 'video-source3' } ],
      poster: 'poster-path3',
      title: 'video description3'
    }
  ];

  const getVideoPlayer = (): VideoPlayerComponent => {
    return fixture.debugElement.query(By.css('video-player')).componentInstance;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VideoPlaylistComponent,
        VideoPlayerComponent
      ],
      providers: [ PlaylistService, VideoPlayerService, ScrollToService ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(VideoPlaylistComponent);
      component = fixture.componentInstance;
      getPlaylistSpy = spyOn(PlaylistService.prototype, 'getPlaylist').and.returnValue(testVideos);
      loadVideoSpy = spyOn(VideoPlayerService.prototype, 'loadVideo');
      fixture.detectChanges();
    });
  }));

  describe('on initialization', () => {
    it('should fetch the list of videos', () => {
      expect(getPlaylistSpy).toHaveBeenCalledTimes(1);
    });

    it('should load the first video in the list', () => {
      expect(loadVideoSpy).toHaveBeenCalledWith(testVideos[0], 0, false, true, false);
      expect(loadVideoSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when a video finishes playback', () => {
    it('should play the next video if continuous play is on ' +
      'and the current video is not the last video in the list', () => {
        loadVideoSpy.calls.reset();
        component.continuousPlay = true;
        component.currentIndex = 0;
        const videoPlayerComponent = getVideoPlayer();
        videoPlayerComponent.onEnded.emit();
        expect(loadVideoSpy).toHaveBeenCalledWith(testVideos[1], 1, true, true, true);
        expect(loadVideoSpy).toHaveBeenCalledTimes(1);
    });

    describe('should not play the next video', () => {
      it('when continuous play is off', () => {
        loadVideoSpy.calls.reset();
        component.continuousPlay = false;
        component.currentIndex = 0;
        const videoPlayerComponent = getVideoPlayer();
        videoPlayerComponent.onEnded.emit();
        expect(loadVideoSpy).toHaveBeenCalledTimes(0);
      });

      it('when the current video is the last video in the list', () => {
        loadVideoSpy.calls.reset();
        component.continuousPlay = true;
        component.currentIndex = testVideos.length - 1;
        const videoPlayerComponent = getVideoPlayer();
        videoPlayerComponent.onEnded.emit();
        expect(loadVideoSpy).toHaveBeenCalledTimes(0);
      });
    });
  });

  it('should update the continuous play value when icon is clicked', () => {
    expect(component.continuousPlay).toBeTruthy();
    fixture.debugElement.nativeElement.querySelector('i.fi-loop').click();
    fixture.detectChanges();
    expect(component.continuousPlay).toBeFalsy();
    fixture.debugElement.nativeElement.querySelector('i.fi-loop').click();
    fixture.detectChanges();
    expect(component.continuousPlay).toBeTruthy();
  });

  describe('when the video player requests the next video', () => {
    it('should load the next video in the list', () => {
      loadVideoSpy.calls.reset();
      const videoPlayerComponent = getVideoPlayer();
      videoPlayerComponent.playNext();
      expect(loadVideoSpy).toHaveBeenCalledWith(testVideos[1], 1, true, true, true);
      expect(loadVideoSpy).toHaveBeenCalledTimes(1);
    });

    it('should disable the next button on the video player' +
        'if the next video is the last video in the list', () => {
      component.currentIndex = 1;
      loadVideoSpy.calls.reset();
      const videoPlayerComponent = getVideoPlayer();
      videoPlayerComponent.playNext();
      expect(loadVideoSpy).toHaveBeenCalledWith(testVideos[2], 2, true, false, true);
      expect(loadVideoSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the video player requests the previous video', () => {
    it('should load the previous video in the list', () => {
      loadVideoSpy.calls.reset();
      component.currentIndex = 2;
      const videoPlayerComponent = getVideoPlayer();
      videoPlayerComponent.playPrevious();
      expect(loadVideoSpy).toHaveBeenCalledWith(testVideos[1], 1, true, true, true);
      expect(loadVideoSpy).toHaveBeenCalledTimes(1);
    });

    it('should disable the next button on the video player' +
        'if the next video is the last video in the list', () => {
      component.currentIndex = 1;
      loadVideoSpy.calls.reset();
      const videoPlayerComponent = getVideoPlayer();
      videoPlayerComponent.playPrevious();
      expect(loadVideoSpy).toHaveBeenCalledWith(testVideos[0], 0, true, true, false);
      expect(loadVideoSpy).toHaveBeenCalledTimes(1);
    });
  });
});