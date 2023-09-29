import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  number = 0;

  title = 'roonrental';
  private game = 8;
  value = 'ram';

  onadd() {
    // this.number = ++this.number;
    this.number += 1;
  }
  onmin() {
    if (this.number == 0) {
      return;
    }
    // this.number = --this.number;
    this.number -= 1;
  }
}
