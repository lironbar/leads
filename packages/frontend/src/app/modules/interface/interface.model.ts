export interface Interface {
    email?: string;
    url?: string;
    method?: string; // POST/GET
    properties?: any[]; // {name: string, defaultValue?: any}
}
