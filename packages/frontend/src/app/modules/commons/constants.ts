import {environment} from '../../../environments/environment';

export class Constants {
    // public static get BASE_URL(): string { return 'http://localhost:8080'; }
    public static get BASE_URL(): string { return environment.baseUrl; }
    // public static get BASE_URL(): string { return 'http://192.168.1.104:8080'; }
}
