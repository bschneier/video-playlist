import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistRoutingModule } from './playlist.routing.module';
import { PlaylistService } from './playlist-service/playlist.service';
import { VideoPlayerService } from './video-player-service/video-player.service';
import { PlaylistItemComponent } from './playlist-item/playlist-item.component';
import { SharedModule } from '../shared/shared.module';
import { TimePipe } from './time-pipe/time.pipe';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VideoPlaylistComponent } from './video-playlist.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PlaylistRoutingModule
  ],
  declarations: [
    PlaylistItemComponent,
    TimePipe,
    VideoPlayerComponent,
    VideoPlaylistComponent
  ],
  providers: [
    PlaylistService,
    VideoPlayerService
  ]
})
export class PlaylistModule { }
