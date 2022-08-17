import { Injectable } from '@angular/core';
import { RestDataSource } from './rest.datasource';
import { User } from './user.model';

@Injectable()
export class UserRepository {
  constructor(private datasource: RestDataSource) {}

  loginUser(user: User) {
    return this.datasource.login(user);
  }

  logoutUser() {
    return this.datasource.logout();
  }

  registerUser(user: User) {
    return this.datasource.register(user);
  }
}
