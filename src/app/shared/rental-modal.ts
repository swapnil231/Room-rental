class CImage {
  _id!: string;
  url!: string;
  cloudinaryId!: string;
}

export class Rental {
  _id = ''; // unique identifier as it will be stored in DB
  title = ''; // Some nice place in LA
  city = ''; // Los Angeles
  street = ''; // Main Street
  category = ''; // apartment
  image!: CImage;
  numOfRooms!: number; // 5
  description = ''; // Some nice place near a beach.
  dailyPrice!: number; // 127
  shared!: boolean; // true || false
  createdAt = ''; // 23/12/2020 11:11:11
  static readonly CATEGORIES = ['apartment', 'condo', 'house'];
}
