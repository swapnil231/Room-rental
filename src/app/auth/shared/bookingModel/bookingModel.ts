import { Rental } from 'src/app/shared/rental-modal';
import { RegisterForm } from '../../RegisterForm';

export class bookingModel {
  _id!: Number;
  startAt!: string;
  endAt!: string;
  price!: number;
  guests!: number;
  nights!: number;
  rental!: Rental;
  user!: RegisterForm;
  createdAt?: string;
  // rentaldailyprice?: number;
}
