import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { CoreModule } from './core/core.module';
import { PlaylistModule } from './playlist/playlist.module';
import { routes } from './routes';
import { AppComponent } from './app.component';

@NgModule({
  imports:      [
    BrowserModule,
    RouterModule.forRoot(routes),
    CoreModule,
    PlaylistModule,
    ScrollToModule.forRoot()
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
