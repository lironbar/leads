import { Campaign } from '../campaigns/campaign.model';

export interface Publisher {
  _id?: string;
  name: string;
  phone: string;
  email: string;
  campaigns?: Campaign[];
  address: string;
}
