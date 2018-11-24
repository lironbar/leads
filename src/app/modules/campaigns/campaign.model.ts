export interface Campaign {
  _id?: string;
  publisherId?: string;
  publisher?: string;
  name: string;
  description: string;
  imageUrl?: string;
  price: number;
  score: number;
}
