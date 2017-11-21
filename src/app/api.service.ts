import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http, Response } from '@angular/http';

import { Contact } from './contacts/contact.model';
import { Address } from './addresses/address.model';
import { Country } from './shared/country.model';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  constructor(
    private http: Http
  ) { }

  public getAddressesByContactId(contactId: number): Observable<Address[]> {
    return this.http
    .get(`${API_URL}/addresses/?contactId=${contactId}`)
    .map(rsponse => {
      const addresses = rsponse.json();
      return addresses.map((address: Address) => new Address(address));
    }).catch(this.handleError);
  }

  public getAllCountries(): Observable<Country[]> {
    return this.http
    .get(`${API_URL}/countries`)
    .map(rsponse => {
      const countries = rsponse.json();
      return countries.map((country: Country) => new Country(country));
    }).catch(this.handleError);
  }

  // API - GET /contacts
  public getAllContacts(): Observable<Contact[]> {
    // will use this.http.get()
    return this.http
    .get(`${API_URL}/contacts`)
    .map((response: Response) => {
      const contacts = response.json();
      return contacts;
      // return contacts.map((contact: Contact) => new Contact(contact));
    }).catch(this.handleError);
  }

  // API - GET /contacts/:id
  public getContactById(contactId: number): Observable<Contact> {
    return this.http
    .get(`${API_URL}/contacts/${contactId}`)
    .map(response => new Contact(response.json()))
    .catch(this.handleError);
  }

  // API - PUT /contacts/:id
  public updateAddress(address: Address) {
    // will use this.http.put()
    console.log(address);
    return this.http
    .patch(`${API_URL}/addresses/${address.id}`, address);
  }

  // API - PUT /contacts/:id
  public updateContact(contact: Contact): Observable<Contact> {
    // will use this.http.put()
    return this.http
    .post(`${API_URL}/contacts/${contact.id}`, contact)
    .catch(this.handleError);
  }

  // DELETE /contacts/:id
  public deleteContactByID(contactId: number) {
    return this.http
    .delete(`${API_URL}/contacts/${contactId}`);
  }

  public deleteAddressByID(addressId: number) {
    // will use this.http.delete()
    return this.http
    .delete(`${API_URL}/addresses/${addressId}`);
  }

  public createContact(contact: Contact) {
    return this.http.post(`${API_URL}/contacts`, contact);
  }

  // API - POST /contacts
  public createAddress(address: Address) {
    return this.http.post(`${API_URL}/addresses`, address);
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
