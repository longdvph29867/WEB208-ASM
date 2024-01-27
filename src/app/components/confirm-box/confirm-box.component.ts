import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-box',
  standalone: true,
  imports: [],
  templateUrl: './confirm-box.component.html',
  styleUrl: './confirm-box.component.css'
})
export class ConfirmBoxComponent {
  title!: string;
  message!: string;
  constructor(
    public dialogRef: MatDialogRef<ConfirmBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
