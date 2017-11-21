import {
  Component,
  OnInit,
  Injectable,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from '../contacts/contact.model';

import { ApiService } from '../api.service';
import { MessageService } from '../message.service';

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: [
    './contacts.component.scss'
  ],
})

export class ContactsComponent implements OnInit, OnDestroy {
  @ViewChild('fullNameInput') nameInputRef: ElementRef;
  // Placeholder for last contact id to simulate auto-incremented id's
  lastContactId: number;
  contacts: Contact[] = [];
  messageSub: Subscription;
  selectedId;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: ApiService,
    private messsageService: MessageService
  ) {
    this.messageSub = this.messsageService.getContact().subscribe(
      (contact: Contact) => { this.contacts.push(contact); }
    );
  }

  ngOnInit() {
    this.service
    .getAllContacts()
    .subscribe(
      (contact: Contact[]) => {
        this.contacts = contact;
      }
    );
  }

  ngOnDestroy() {
    this.messageSub.unsubscribe();
  }

  onView(id: number) {
    this.selectedId = id;
    this.router.navigate([id, 'edit'], {relativeTo: this.activatedRoute});
  }

  onDelete(id: number, event: Event): void {
    event.stopPropagation();
    this.service.deleteContactByID(id).subscribe(
      (response) => {
        // Remove deleted contact for array.
        this.contacts = this.
          contacts.filter(contact => contact.id !== id);
        // Navigat back to contats
        this.router.navigate(['contacts']);
      },
      (error) => console.log(error)
    );
  }
}
