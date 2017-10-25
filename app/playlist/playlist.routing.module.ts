import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VideoPlaylistComponent } from './video-playlist.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: 'video-playlist', component: VideoPlaylistComponent }
  ])],
  exports: [
    RouterModule
  ]
})
export class PlaylistRoutingModule { }