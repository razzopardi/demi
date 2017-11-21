import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { FormGroup, FormArray } from '@angular/forms';

import { AddressInterface, ContactInterface } from '../../contacts/contact.interface';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: []
})
export class AddressListComponent implements OnInit {
  @Input('contactForm')
  public contactForm: FormGroup;

  @Input('addresses')
  public addresses: AddressInterface[];

  contactId: number;
  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // ContactID
    this.contactForm.addControl('addresses', new FormArray([]));
    this.contactId = this.contactForm.value.id;
  }

  addAddress() {
    const address: AddressInterface = {
      id: null,
      contactId: this.contactId,
      street1: '',
      street2: '',
      town: '',
      country: ''
    };
    this.addresses.push(address);
    this.cdRef.detectChanges();
  }

  removeAddress(index: number) {
    // if (this.addresses.length > 1) {
      const addressForRemoval = this.addAddress[index];
      console.log(addressForRemoval);
        this.addresses.splice(index, 1);
        (<FormArray>this.contactForm.get('addresses')).removeAt(index);
    // }
    // return false;
  }

}
