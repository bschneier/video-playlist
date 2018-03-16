import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { enableProdMode } from '@angular/core';
import './main.scss';

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    navigator.serviceWorker.register('/ngsw-worker.js');
  }
}).catch((err) => console.log(err));
