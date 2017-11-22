import {
  Component,
  OnInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';

import { ApiService } from '../../api.service';
import { MessageService } from '../../message.service';

import { Contact } from '../contact.model';
@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})

export class ContactAddComponent implements OnInit {
  validFullNameReg = /\w+\s\w+/;
  newContactForm: FormGroup;

  constructor(
    private service: ApiService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.newContactForm = new FormGroup({
      'fullname': new FormControl(
        '',
        [
          Validators.required,
          this.forbiddenFullName.bind(this)
        ])
    });
  }

  onSave(): void {
    const nameArray = this.newContactForm.value.fullname.trim().split(' ');
    const contact = new Contact({
      first_name: nameArray[0].trim(),
      last_name: nameArray[1].trim()
    });
    this.service.createContact(contact).subscribe(
      (response) => {
        // Send new Contact to Contact list
        this.messageService.sendContact(<Contact>response.json());

        // Route app to new Contact edit
        this.router.navigate([+response.json().id, 'edit'], {relativeTo: this.activatedRoute});
      },
      (error) => console.log(error),
    );
  }

  // Full name validator: Users are only allowed to enter two words with space in between
  forbiddenFullName(control: FormControl): {[s: string]: boolean} {
    if (this.validFullNameReg.exec(control.value) === null) {
      return {'forbiddenFullName': true};
    }
    return null;
  }

}
