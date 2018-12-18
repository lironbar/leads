import { Campaign } from '../campaigns/campaign.model';

export interface Affiliate {
  _id?: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  campaignIds?: Campaign[];
}
