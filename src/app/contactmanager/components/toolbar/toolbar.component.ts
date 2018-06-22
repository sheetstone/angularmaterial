import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav: EventEmitter<void> = new EventEmitter();
  @Output() toggleTheme: EventEmitter<void> = new EventEmitter();
  @Output() toggleDir: EventEmitter<void> = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: Router
  ) { }

  ngOnInit() {
  }
  openAddContactDialog(): void {
    const dialogRef = this.dialog.open(NewContactDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed', result);
      if (result) {
        this.openSnackBar('User Added', 'Go to check')
          .onAction().subscribe(() => {
            this.route.navigate(['/contactmanager', result.id]);
          });
      }
    });
  }
  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
