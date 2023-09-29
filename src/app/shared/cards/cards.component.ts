import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Rental } from '../rental-modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
  @Input() rentalsend: any;
  data = 100;

  onsend() {}
}
