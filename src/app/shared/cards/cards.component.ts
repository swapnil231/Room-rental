import { Component, Input } from '@angular/core';
import { Rental } from '../rental-modal';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
  @Input() rentalsend!: Rental;

  data = 100;

  convertStringtoNumber(assets: any) {
    const { numOfRooms } = this.rentalsend;

    return parseInt(<any>numOfRooms, 10) + assets;
  }
}
