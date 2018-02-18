import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { PlaylistItemComponent } from './playlist-item.component';
import { VideoPlayerService } from '../video-player-service/video-player.service';
import { TimePipe } from '../time-pipe/time.pipe';
import { SafeUrlPipe } from '../../shared/pipes/safe-url/safe-url.pipe';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

describe('PlaylistItemComponent', () => {
  let component: PlaylistItemComponent;
  let fixture: ComponentFixture<PlaylistItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistItemComponent, TimePipe, SafeUrlPipe, SpinnerComponent ],
      providers: [ VideoPlayerService, ScrollToService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
