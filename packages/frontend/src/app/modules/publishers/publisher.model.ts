import {Campaign} from '../campaigns/campaign.model';
import {User} from '../../core/user/user.model';

export interface Publisher {
    _id?: string;
    user?: User;
    name: string;
    contact?: string;
    phone: string;
    email: string;
    address?: string;
    phc: string;
    campaignIds?: Campaign[];
}
