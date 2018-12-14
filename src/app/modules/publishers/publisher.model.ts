import { Campaign } from '../campaigns/campaign.model';

export interface Publisher {
  _id?: string;
  name: string;
  contact?: string;
  phone: string;
  email: string;
  address: string;
  phc: string;
  campaignIds?: Campaign[];
}
