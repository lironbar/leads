export interface Interface {
    _id?: string;
    campaignId?: string;
    type?: string;
    email?: string;
    url?: string;
    method?: string; // POST/GET
    fields?: InterfaceField[]; // {name: string, value?: any}
}

export interface InterfaceField {
    isPhoneNumber?: boolean;
    isName?: boolean;
    name: string,
    type: string,
    value?: string,
    options?: InterfaceFieldOption[],
    isStatic?: boolean,
    isRequired?: boolean
}

export interface InterfaceFieldOption {
    name: string,
    value: string
}
