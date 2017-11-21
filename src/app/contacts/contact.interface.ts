export interface ContactInterface {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
    addresses: AddressInterface[];
}

export interface AddressInterface {
    id: number;
    contactId: number;
    street1: string;
    street2: string;
    town: string;
    country: string;
}
