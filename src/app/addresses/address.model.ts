export class Address {
    street1: string;
    street2: string;
    town: string;
    country: string;
    contactId: number;
    id: number;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
