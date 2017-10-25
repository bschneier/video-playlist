import { Component } from '@angular/core';

@Component({
  selector: 'video-playlist',
  template: `
    <video-header></video-header>
    <main>
      <div class="container-fluid">
        <router-outlet></router-outlet>
      </div>
    </main>`
})
export class AppComponent { }
