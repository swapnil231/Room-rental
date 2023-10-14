import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Rental } from '../rental-modal';
import { Router } from '@angular/router';
import { RentalistingService } from '../rentalisting.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  ngOnInit(): void {}

  @Input() rentalsend!: Rental;

  data = 100;

  onsend() {}
}
