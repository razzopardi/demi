export class Country {
    iso2: string;
    name: string;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
