import { Component } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {
  constructor() {}

  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Spinner Button',
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
    buttonIcon: {
      fontIcon: 'favorite'
    }
  };

  fabSpinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Spinner Button',
    spinnerSize: 18,
    raised: true,
    fab: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
    icon: {
      fontIcon: 'favorite'
    }
  };

  barButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Progress Bar Button',
    buttonColor: 'accent',
    barColor: 'primary',
    raised: true,
    stroked: false,
    mode: 'indeterminate',
    value: 0,
    disabled: false,
    fullWidth: false,
    buttonIcon: {
      fontIcon: 'favorite'
    }
  };

  someFunc(): void {
    this.spinnerButtonOptions.active = true;
    setTimeout(() => {
      this.spinnerButtonOptions.active = false;
    }, 3500);
  }

  someFunc2(): void {
    this.barButtonOptions.active = true;
    this.barButtonOptions.text = 'Saving Data...';
    setTimeout(() => {
      this.barButtonOptions.active = false;
      this.barButtonOptions.text = 'Progress Bar Button';
    }, 3500);
  }

  someFunc3(): void {
    this.fabSpinnerButtonOptions.active = true;
    this.fabSpinnerButtonOptions.text = 'Saving Data...';
    setTimeout(() => {
      this.fabSpinnerButtonOptions.active = false;
      this.fabSpinnerButtonOptions.text = 'Progress Bar Button';
    }, 3500);
  }
}
