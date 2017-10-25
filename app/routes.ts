import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'video-playlist', pathMatch: 'full' },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];