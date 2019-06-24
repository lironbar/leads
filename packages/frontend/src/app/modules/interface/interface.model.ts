export interface InterfaceField {
    name: string,
    type: string,
    value?: string,
    options?: any[],
    isStatic?: boolean,
    isRequired?: boolean
}

export interface Interface {
    _id?: string;
    campaignId?: string;
    type?: string;
    email?: string;
    url?: string;
    method?: string; // POST/GET
    fields?: InterfaceField[]; // {name: string, value?: any}
    properties?: InterfaceField[]; // OLD USAGE - {name: string, value?: any}
}
