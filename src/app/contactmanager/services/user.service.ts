import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  private _users: BehaviorSubject<User[]>;

  private dataStore: {
    users: User[]
  };

  constructor(private http: HttpClient, private route: Router) {
    this.dataStore = { users: [] };
    this._users = new BehaviorSubject<User[]>([]);
  }
  get users(): Observable<User[]> {
    return this._users.asObservable();
  }
  userById(id: number) {
    const user = this.dataStore.users.find(x => x.id === id);
    console.log(user);
    if (user) {
      return user;
    } else {
      this.route.navigate(['/contactmanager', 1]);
    }
  }
  loadAll() {
    const usersUrl = './api/users.json';

    return this.http.get<User[]>(usersUrl)
      .subscribe(data => {
        this.dataStore.users = data;
        this._users.next(Object.assign({}, this.dataStore).users);
      }, error => {
        console.log('Failed to fetch users');
      });
  }
  addUser(user: User): Promise<User> {
    return new Promise((resolver, reject) => {
      user.id = this.dataStore.users.length + 1;
      this.dataStore.users.push(user);
      this._users.next(Object.assign({}, this.dataStore).users);
      resolver(user);
    });
  }
}
