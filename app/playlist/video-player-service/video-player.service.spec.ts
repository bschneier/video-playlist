import { TestBed, inject } from '@angular/core/testing';
import { VideoPlayerService } from './video-player.service';

describe('VideoPlayerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideoPlayerService]
    });
  });

  it('should be created', inject([VideoPlayerService], (service: VideoPlayerService) => {
    expect(service).toBeTruthy();
  }));
});
