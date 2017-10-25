import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core.routing.module';
import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  declarations: [
    HeaderComponent,
    ErrorComponent
  ],
  exports: [
    HeaderComponent,
    ErrorComponent
  ]
})
export class CoreModule { }
