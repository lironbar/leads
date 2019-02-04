export interface Campaign {
  _id?: string;
  subject?: string;
  active?: boolean;
  publisherId?: string;
  publisher?: string;
  name: string;
  description: string;
  demands?: any[];
  imageUrl?: string;
  price: number;
  maxLeads: number;
  hedgePercentage: number;
  maxDailyLeads: number;
  marketingText: string;
  email?: string;
  apiId?: string;
  marketingStrategies?: any[];
  affiliate?: [{ maxLeads: boolean; active: boolean; id: 1234; price: 45; }];
}
