import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AddressInterface, ContactInterface } from '../contact.interface';
import { Contact } from '../contact.model';

import { ApiService } from '../../api.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: []
})
export class ContactFormComponent implements OnInit {
  public initialAddressesId: number[];
  public contactData: ContactInterface;
  public contactForm: FormGroup;

  private initialContactAddresses: AddressInterface[];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: ApiService
  ) { }

  ngOnInit() {
    this.getContactData();
    this.contactForm = this.toFormGroup(this.contactData);
  }

  private getContactData() {
    this.activatedRoute.data
    .subscribe(
      (data: Data) => {
        console.log(data);
        this.contactData =  data['contact'] as ContactInterface;
        this.contactData.addresses = [];
        this.initialAddressesId = [];
        const address = data['addresses'];
        address.forEach(element => {
          this.contactData.addresses.push(element);
          // Initial addres to be used in deletion.
          this.initialAddressesId.push(element.id);
        });
      }
    );
  }

  private toFormGroup(data: ContactInterface): FormGroup {
    const formGroup = this.formBuilder.group({
      id: [ data.id ],
      first_name: [ data.first_name],
      last_name: [ data.last_name ],
      avatar: [ data.avatar ],
    });

    return formGroup;
  }

  onSubmit() {
    if (!this.contactForm.valid) {
      console.error('Submission denied: FORM INVALID!');
      return false;
    } else {
      this.contactForm.controls.addresses['controls']
        .filter((formControl: FormControl) => {
          const address: AddressInterface = <AddressInterface>formControl.value;
          if (formControl.pristine === false && formControl.touched === true) {
            // Addresses without id have not been added to the database.
            if (address.id === null) {
              // Set contact id
              address.contactId = this.contactData.id;
              console.log(`Creating: ${JSON.stringify(address)}`);
              this.service.createAddress(address).subscribe(
                (response) => console.log(response),
                (error) => console.log(error)
              );
            } else {
              // Addresses with id has to be updated.
              console.log(`Updating: ${JSON.stringify(address)}`);
              this.service.updateAddress(address).subscribe(
                (response) => console.log(response),
                (error) => console.log(error)
              );
            }
          }
        });
        this.deleteAddresses();
      }
  }

  deleteAddresses() {
    let ids = [];
    // Get the ids of the current addresses in the contactData
    const currentIDs = this.contactData.addresses.map(
      (address: AddressInterface) => address.id
    );

    if (currentIDs != null) {
      ids = this.initialAddressesId.filter(
        (id: number) => currentIDs.indexOf(id) < 0
      );
    } else {
      // If no adress id are fournd in contactData
      // I assumet that all addresses have been removed.
      ids = this.initialAddressesId;
    }

    ids.forEach(
      (id) => {
        console.log(`Deleting: ${id}`);
        this.service.deleteAddressByID(id).subscribe(
          (response) => {
            return;
          }
        );
      }
    );
  }
}
