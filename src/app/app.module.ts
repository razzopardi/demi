import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactAddComponent } from './contacts/contact-add/contact-add.component';

import { ApiService } from './api.service';
import { MessageService } from './message.service';

import { AddressResolver } from './addresses/address-resolver.service';
import { ContactResolver } from './contacts/contact-resolver.service';
import { ContactFormComponent } from './contacts/contact-form/contact-form.component';
import { AddressListComponent } from './addresses/address-list/address-list.component';
import { AddressFormComponent } from './addresses/address-form/address-form.component';

const appRoutes: Routes = [
  {path: 'contacts', component: ContactsComponent, children: [
    {path: 'add', component: ContactAddComponent},
    {path: ':id/edit', component: ContactFormComponent, resolve: {
      contact: ContactResolver,
      addresses: AddressResolver
    }},
    {path: '', component: ContactAddComponent},
  ]},
  // {path: '', component: HomeComponent},
  {path: '**', component: HomeComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ContactsComponent,
    ContactAddComponent,
    ContactFormComponent,
    AddressListComponent,
    AddressFormComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    ApiService,
    MessageService,
    ContactResolver,
    AddressResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
