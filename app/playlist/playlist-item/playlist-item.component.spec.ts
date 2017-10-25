import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaylistItemComponent } from './playlist-item.component';
import { VideoPlayerService } from '../video-player-service/video-player.service';
import { TimePipe } from '../time-pipe/time.pipe';

describe('PlaylistItemComponent', () => {
  let component: PlaylistItemComponent;
  let fixture: ComponentFixture<PlaylistItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistItemComponent, TimePipe ],
      providers: [ VideoPlayerService ]
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
