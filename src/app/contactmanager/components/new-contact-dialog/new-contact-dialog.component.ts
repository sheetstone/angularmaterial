import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.css']
})
export class NewContactDialogComponent implements OnInit {

  user: User;
  avatars = [
    'svg-1', 'svg-2', 'svg-3', 'svg-4',
    'svg-5', 'svg-6', 'svg-7', 'svg-8',
    'svg-9', 'svg-10', 'svg-11', 'svg-12',
  ];

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);
  getErrorMessage() {
    return this.nameFormControl.hasError('required') ? 'You must enter a name' : '';
  }

  constructor(
    private dialogRef: MatDialogRef<NewContactDialogComponent>,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = new User();
  }

  save() {
    this.userService.addUser(this.user).then(user => {
      this.dialogRef.close(user);
    });
  }
  dismiss() {
    this.dialogRef.close(null);
  }


}
