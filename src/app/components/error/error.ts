import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.html',
})
export class Error {
  error = input<string>();
}
