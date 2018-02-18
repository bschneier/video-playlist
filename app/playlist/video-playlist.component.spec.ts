import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { VideoPlaylistComponent } from './video-playlist.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { PlaylistItemComponent } from './playlist-item/playlist-item.component';
import { PlaylistService } from './playlist-service/playlist.service';
import { VideoPlayerService } from './video-player-service/video-player.service';
import { TimePipe } from './time-pipe/time.pipe';
import { SafeUrlPipe } from '../shared/pipes/safe-url/safe-url.pipe';
import { SpinnerComponent } from '../shared/components/spinner/spinner.component';

describe('VideoPlaylistComponent', () => {
  let component: VideoPlaylistComponent;
  let fixture: ComponentFixture<VideoPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VideoPlaylistComponent,
        VideoPlayerComponent,
        PlaylistItemComponent,
        TimePipe,
        SafeUrlPipe,
        SpinnerComponent
      ],
      providers: [ PlaylistService, VideoPlayerService, ScrollToService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});