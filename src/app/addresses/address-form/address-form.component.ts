import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import { AddressInterface, ContactInterface } from '../../contacts/contact.interface';

import { Country } from '../../shared/country.model';

import { ApiService } from '../../api.service';
@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: []
})
export class AddressFormComponent implements OnInit {
  @Input('addresses')
  public addresses: FormArray;

  @Input('address')
  public address: AddressInterface;

  public addressForm: FormGroup;
  private countries: Country[];

  constructor(
    private formBuilder: FormBuilder,
    private service: ApiService
  ) { }

  ngOnInit() {
    this.addressForm = this.toFormGroup(this.address);
    this.addresses.push(this.addressForm);

    this.service.getAllCountries().subscribe(
      countries => {
        this.countries = countries as Country[];
      }
    );
  }

  private toFormGroup(data: AddressInterface) {

    const formGroup = this.formBuilder.group({
      id: [data.id || null],
      street1: [data.street1 || '', Validators.required ],
      street2: [data.street2 || '', Validators.required ],
      town: [data.town || '', Validators.required ],
      country: [data.country || '', Validators.required ]
    });

    return formGroup;
  }
}
