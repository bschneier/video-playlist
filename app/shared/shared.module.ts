import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SafeUrlPipe } from './pipes/safe-url/safe-url.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SafeUrlPipe,
    SpinnerComponent
  ],
  exports: [
    SafeUrlPipe,
    SpinnerComponent
  ]
})
export class SharedModule { }
