export class Contact {
    id: number;
    first_name: string;
    last_name: string;
    // Default value
    avatar = 'https://handmade.network/static/light/empty-avatar.svg';
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

