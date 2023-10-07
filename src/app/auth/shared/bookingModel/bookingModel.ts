import { Rental } from 'src/app/shared/rental-modal';

export class bookingModel {
  _id!: Number;
  startAt!: string;
  endAt!: string;
  price!: number;
  guests!: number;
  nights!: number;
  rental!: Rental;
  user!: string;
  // rentaldailyprice?: number;
}
