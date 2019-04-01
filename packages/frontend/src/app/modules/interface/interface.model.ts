export interface Interface {
    _id?: string;
    campaignId?: string;
    type?: string;
    email?: string;
    url?: string;
    method?: string; // POST/GET
    properties?: any[]; // {name: string, defaultValue?: any}
}
