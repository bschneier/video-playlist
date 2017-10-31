import { TestBed, inject } from '@angular/core/testing';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { VideoPlayerService } from './video-player.service';

describe('VideoPlayerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ VideoPlayerService, ScrollToService ]
    });
  });

  it('should be created', inject([VideoPlayerService], (service: VideoPlayerService) => {
    expect(service).toBeTruthy();
  }));
});
