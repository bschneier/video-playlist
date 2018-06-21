import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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
export class AppComponent {

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
    window.HELP_IMPROVE_VIDEOJS = false;

    if (!navigator.onLine) {
      this.showOfflineBanner();
    }
    window.addEventListener('offline', this.showOfflineBanner);

    if ((navigator as any).standalone === false) {
      // This is an iOS device and we are in the browser
      this.snackBar.open('You can install this app on your device! To install, tap the ' +
        'share button at the bottom of the browser and then select \'Add to Home Screen\'',
        '', { duration: 9000 });
    }
    if ((navigator as any).standalone === undefined) {
      // It's not iOS
      if (window.matchMedia('(display-mode: browser').matches) {
        // We are in the browser
        window.addEventListener('beforeinstallprompt', (event) => {
          event.preventDefault();
          const sb = this.snackBar.open('Do you want to install this app?', 'Install',
            {duration: 6000});
          sb.onAction().subscribe( () => {
             (event as any).prompt();
             (event as any).userChoice.then( (result: any) => {
                if (result.outcome === 'dismissed') {
                  // TODO: Track rejected installation
                } else {
                  // TODO: Track successful installation
                }
             });
          });
          return false;
        });
      }
    }
  }

  showOfflineBanner() {
    // TODO
  }
}
