import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Contact } from './contacts/contact.model';

@Injectable()
export class MessageService {
  private subject = new Subject<any>();

  sendContact(contact: Contact) {
    this.subject.next(contact);
  }

  getContact(): Observable<Contact> {
    return this.subject.asObservable();
  }

  constructor() { }

}
