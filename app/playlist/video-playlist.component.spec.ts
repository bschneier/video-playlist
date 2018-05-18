import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { VideoPlaylistComponent } from './video-playlist.component';
import { PlaylistService } from './playlist-service/playlist.service';
import { VideoPlayerService } from './video-player-service/video-player.service';
import { Video } from '../shared/types/video';
import { VideoSource } from '../shared/types/videoSource';

describe('VideoPlaylistComponent', () => {
  let component: VideoPlaylistComponent;
  let fixture: ComponentFixture<VideoPlaylistComponent>;
  let getPlaylistSpy: jasmine.Spy;
  let loadVideoSpy: jasmine.Spy;
  const testVideos = [
    new Video(20, 'testVideoThumnailSource1', [ new VideoSource('video/mp4', 'video-source1') ],
      'poster-path1', 'video description1'),
    new Video(40, 'testVideoThumnailSource2', [ new VideoSource('video/mp4', 'video-source2') ],
      'poster-path2', 'video description2')
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VideoPlaylistComponent
      ],
      providers: [ PlaylistService, VideoPlayerService, ScrollToService ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPlaylistComponent);
    component = fixture.componentInstance;
    getPlaylistSpy = spyOn(PlaylistService.prototype, 'getPlaylist').and.returnValue(testVideos);
    loadVideoSpy = spyOn(VideoPlayerService.prototype, 'loadVideo');
    fixture.detectChanges();
  });

  describe('on initialization', () => {
    it('should fetch the list of videos', () => {
      expect(getPlaylistSpy).toHaveBeenCalledTimes(1);
    });

    it('should load the first video in the list', () => {
      expect(loadVideoSpy).toHaveBeenCalledWith(testVideos[0], 0, false);
      expect(loadVideoSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when a video finishes playback', () => {
    it('should play the next video if continuous play is on ' +
      'and the current video is not the last video in the list', () => {
        component.continuousPlay = true;
        component.currentIndex = 0;
        component.onEnded();
        expect(loadVideoSpy).toHaveBeenCalledWith(testVideos[1], 1, true);
        // once during initialization and once when video ended
        expect(loadVideoSpy).toHaveBeenCalledTimes(2);
    });

    describe('should not play the next video', () => {
      it('when continuous play is off', () => {
        component.continuousPlay = false;
        component.currentIndex = 0;
        component.onEnded();
        // once during initialization and should not be called again when video ended
        expect(loadVideoSpy).toHaveBeenCalledTimes(1);
      });

      it('when the current video is the last video in the list', () => {
        component.continuousPlay = true;
        component.currentIndex = testVideos.length - 1;
        component.onEnded();
        // once during initialization and should not be called again when video ended
        expect(loadVideoSpy).toHaveBeenCalledTimes(1);
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
});