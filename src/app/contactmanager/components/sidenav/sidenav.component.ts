import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private mediaMatcher: MediaQueryList = window.matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  users: Observable<User[]>;
  isDarkTheme: Boolean = false;
  dir = 'ltr';

  constructor(
    zone: NgZone,
    private userService: UserService,
    private router: Router) {
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = mql));
  }

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  ngOnInit() {
    this.users = this.userService.users;
    this.userService.loadAll();
    /* this.users.subscribe(data => {
      if (data.length > 0) {
        this.router.navigate(['/contactmanager', data[0].id]);
      }
    });*/

    this.router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });
  }


  isScreenSmall(): boolean {
    // console.log(this.mediaMatcher.matches);
    return this.mediaMatcher.matches;
  }
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }
  toggleDir() {
    this.dir = (this.dir === 'ltr') ? 'rtl' : 'ltr';
    console.log(this.dir);
  }
}
