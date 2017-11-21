import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Address } from '../addresses/address.model';

import { ApiService } from '../api.service';

@Injectable()
export class AddressResolver implements Resolve<Address[]> {
  constructor(private service: ApiService) {
  }

  // Gets and passes the contact to the component before it's initialized
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Address[]> | Promise<Address[]> | Address[] {
    const contactId = +route.params['id'];
    return this.service.getAddressesByContactId(contactId);
  }
}
