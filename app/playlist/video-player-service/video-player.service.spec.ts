import { TestBed, inject } from '@angular/core/testing';
import { ScrollToService, ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { VideoPlayerService } from './video-player.service';
import { Video, LoadVideoRequest } from '../../shared/types';

describe('VideoPlayerService', () => {
  const testVideo = {
    length: 65,
    thumbnail: 'testVideoThumnailSource',
    sources: [ { type: 'video/mp4', src: 'video-source' } ],
    poster: 'poster-path',
    title: 'video description'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ScrollToModule.forRoot() ],
      providers: [ VideoPlayerService ]
    });
  });

  describe('loadVideo()', () => {
    it('should scroll to selected item', inject([VideoPlayerService], (service: VideoPlayerService) => {
      const scrollToSpy = spyOn(ScrollToService.prototype, 'scrollTo');
      service.loadVideo(testVideo, 1, true, true, true);
      expect(scrollToSpy).toHaveBeenCalled();
    }));

    it('should emit current video', inject([VideoPlayerService], (service: VideoPlayerService) => {
      let lastVideoEmitted: Video;
      service.getCurrentVideo$.subscribe((value: LoadVideoRequest) => {
        if (value) {
          lastVideoEmitted = value.video;
        }
      });
      expect(lastVideoEmitted).toBeUndefined();
      service.loadVideo(testVideo, 1, true, true, true);
      expect(lastVideoEmitted).toEqual(testVideo);
    }));

    it('should emit current video index', inject([VideoPlayerService], (service: VideoPlayerService) => {
      const testIndexValue = 2;
      let lastVideoIndexEmitted: number;
      service.getCurrentVideoIndex$.subscribe((value: number) => {
        if (value) {
          lastVideoIndexEmitted = value;
        }
      });
      expect(lastVideoIndexEmitted).toBeUndefined();
      service.loadVideo(testVideo, testIndexValue, true, true, true);
      expect(lastVideoIndexEmitted).toEqual(testIndexValue);
    }));
  });

  it('getCurrentVideo should emit current value on subscribe', inject([VideoPlayerService],
      (service: VideoPlayerService) => {
    let lastVideoEmitted: Video;
    service.loadVideo(testVideo, 1, true, true, true);
    expect(lastVideoEmitted).toBeUndefined();
    service.getCurrentVideo$.subscribe((value: LoadVideoRequest) => {
      if (value) {
        lastVideoEmitted = value.video;
      }
    });
    expect(lastVideoEmitted).toEqual(testVideo);
  }));

  it('getCurrentVideoIndex should emit current value on subscribe', inject([VideoPlayerService],
      (service: VideoPlayerService) => {
    let lastVideoIndexEmitted: number;
    const testIndexValue = 2;
    service.loadVideo(testVideo, testIndexValue, true, true, true);
    expect(lastVideoIndexEmitted).toBeUndefined();
    service.getCurrentVideoIndex$.subscribe((value: number) => {
      if (value) {
        lastVideoIndexEmitted = value;
      }
    });
    expect(lastVideoIndexEmitted).toEqual(testIndexValue);
  }));
});
