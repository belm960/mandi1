import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/shared/security/token-storage.service';
import { apiUrl } from 'src/environments/environment';
@Component({
  template: `
    <h1 mat-dialog-title>Hello There</h1>
    <div mat-dialog-content>
      <p>{{Urll}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="close()">Close</button>
    </div>
  `
})
export class SimpleDialogComponent {

  Urll='http://localhost:4200/#/'+localStorage.getItem('shareLink');
  constructor(public dialogRef: MatDialogRef<SimpleDialogComponent>,private token: TokenStorageService) {}
  close(): void {
    this.dialogRef.close();
  }
}
