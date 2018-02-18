import { Component, Input } from '@angular/core';
import './spinner.component.scss';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent {
  @Input() size = 'medium';

  constructor() { }
}
