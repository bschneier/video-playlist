import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: 'error', component: ErrorComponent }
  ])],
  exports: [
    RouterModule
  ]
})
export class CoreRoutingModule { }