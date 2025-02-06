import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-dialog',
  imports: [],
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.css',
})
export class LogoutDialogComponent {
  constructor(private dialogRef: MatDialogRef<LogoutDialogComponent>) {}

  confirmLogOut() {
    this.dialogRef.close(true);
  }

  cancelLogOut() {
    this.dialogRef.close(false);
  }
}
