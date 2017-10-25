import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoPlayerComponent } from './video-player.component';
import { VideoPlayerService } from '../video-player-service/video-player.service';

describe('VideoPlayerComponent', () => {
  let component: VideoPlayerComponent;
  let fixture: ComponentFixture<VideoPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoPlayerComponent ],
      providers: [ VideoPlayerService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
