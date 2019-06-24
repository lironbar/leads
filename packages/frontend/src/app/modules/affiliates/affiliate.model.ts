import { Campaign } from '../campaigns/campaign.model';
import {User} from '../../core/user/user.model';

export interface Affiliate {
  _id?: string;
  user?: User;
  name: string;
  phone: string;
  email: string;
  password?: string;
  address: string;
  campaignIds?: Campaign[];
}
