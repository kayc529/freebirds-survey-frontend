import { Component, OnInit } from '@angular/core';
import { UserRepository } from 'src/app/models/user.repository';

@Component({
  selector: 'partials-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public accessToken: string | null = localStorage.getItem('access_token');

  constructor(private repository: UserRepository) {}

  ngOnInit(): void {
    this.accessToken = localStorage.getItem('access_token');
  }

  logout() {
    this.repository.logoutUser().subscribe(
      (data) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_role');
        window.location.href = window.location.origin + '/home';
      },
      (err) => {
        console.log(err);
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_role');
        window.location.href = window.location.origin + '/home';
      }
    );
  }
}
