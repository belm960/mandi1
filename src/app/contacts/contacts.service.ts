import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contacts } from './contacts.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class ContactsService {
  private readonly API_URL = 'assets/data/contacts.json';
  dataChange: BehaviorSubject<Contacts[]> = new BehaviorSubject<Contacts[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {}
  get data(): Contacts[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllContactss(): void {
    this.httpClient.get<Contacts[]>(this.API_URL).subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  // DEMO ONLY, you can find working methods below
  addContacts(contacts: Contacts): void {
    this.dialogData = contacts;
  }
  updateContacts(contacts: Contacts): void {
    this.dialogData = contacts;
  }
  deleteContacts(id: number): void {
    console.log(id);
  }
}
