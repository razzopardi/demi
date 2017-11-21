import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Contact } from './contact.model';

import { ApiService } from '../api.service';

@Injectable()
export class ContactResolver implements Resolve<Contact> {
  constructor(private service: ApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contact> | Promise<Contact> | Contact {
    const contactId = +route.params['id'];
    return this.service.getContactById(contactId);
  }
}
