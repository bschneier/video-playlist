import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { PlaylistItemComponent } from './playlist-item.component';
import { VideoPlayerService } from '../video-player-service/video-player.service';
import { TimePipe } from '../time-pipe/time.pipe';
import { SafeUrlPipe } from '../../shared/pipes/safe-url/safe-url.pipe';
import { Video } from '../../shared/types';
import { VideoSource } from '../../shared/types';

describe('PlaylistItemComponent', () => {
  let component: PlaylistItemComponent;
  let fixture: ComponentFixture<PlaylistItemComponent>;
  const testVideoLength = 65;
  const testVideoThumnailSource = 'thumbnail-source-path';
  const testIndexValue = 1;
  const testVideo = new Video(testVideoLength, testVideoThumnailSource,
    [ new VideoSource('video/mp4', 'video-source') ], 'poster-path', 'video description');

  function setTestInputs() {
    component.video = testVideo;
    component.index = testIndexValue;
    component.selected = false;
    fixture.detectChanges();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistItemComponent, TimePipe, SafeUrlPipe ],
      providers: [ VideoPlayerService, ScrollToService ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(PlaylistItemComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  describe('when no input values are passed in', () => {
    it('should not display content', () => {
      expect(fixture.nativeElement.querySelectorAll('*').length).toEqual(0);
    });

    it('should set imageLoading flag', () => {
      expect(component.imageLoading).toBeTruthy();
    });
  });

  describe('when input values are passed in', () => {
    it('should display content', () => {
      setTestInputs();
      expect(fixture.nativeElement.querySelectorAll('*').length).toBeGreaterThan(0);
    });

    it('should call time pipe to format video length', () => {
      const timePipeSpy = spyOn(TimePipe.prototype, 'transform');
      setTestInputs();
      expect(timePipeSpy).toHaveBeenCalledTimes(1);
      expect(timePipeSpy).toHaveBeenCalledWith(testVideoLength);
    });

    it('should call safeUrl pipe to cleanse thumbnail source path', () => {
      const safeUrlPipeSpy = spyOn(SafeUrlPipe.prototype, 'transform');
      setTestInputs();
      expect(safeUrlPipeSpy).toHaveBeenCalledTimes(1);
      expect(safeUrlPipeSpy).toHaveBeenCalledWith(testVideoThumnailSource);
    });

    it('should initially display small spinner while loading thumbnail image', () => {
      setTestInputs();
      expect(fixture.debugElement.nativeElement.querySelector('spinner.small')).toBeDefined();
    });

    it('should remove spinner and display thumbnail image when loaded', () => {
      setTestInputs();
      spyOn(component, 'imageLoaded').and.callThrough();
      const imageElement: HTMLElement = fixture.debugElement.nativeElement.querySelector('img');
      imageElement.dispatchEvent(new Event('load'));
      fixture.detectChanges();
      expect(component.imageLoaded).toHaveBeenCalledTimes(1);
      expect(component.imageLoading).toBeFalsy();
      expect(fixture.debugElement.nativeElement.querySelector('spinner')).toBe(null);
    });
  });

  describe('when playVideo function is called', () => {
    it('selected flag is set', () => {
      setTestInputs();
      component.playVideo();
      expect(component.selected).toBeTruthy();
    });

    it('video service is called to play video', () => {
      const loadVideoSpy = spyOn(VideoPlayerService.prototype, 'loadVideo');
      setTestInputs();
      component.playVideo();
      expect(loadVideoSpy).toHaveBeenCalledTimes(1);
      expect(loadVideoSpy).toHaveBeenCalledWith(testVideo, testIndexValue, true);
    });
  });

  it('when item is clicked, playVideo function is called', () => {
    setTestInputs();
    spyOn(component, 'playVideo').and.callThrough();
    const rootElement: HTMLElement = fixture.debugElement.nativeElement.querySelector('.playlist-item');
    rootElement.click();
    fixture.detectChanges();
    expect(component.playVideo).toHaveBeenCalledTimes(1);
  });
});
