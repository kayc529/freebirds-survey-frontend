import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserRepository } from 'src/app/models/user.repository';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private repository: UserRepository,
    private router: Router
  ) {}

  ngOnInit(): void {
    //if the user already logged in
    if (localStorage.getItem('access_token')) {
      this.router.navigateByUrl('/home');
    }
  }

  login() {
    const username: string =
      (<HTMLInputElement>document.getElementById('input-username'))?.value ||
      '';
    const password: string =
      (<HTMLInputElement>document.getElementById('input-password'))?.value ||
      '';

    if (!username || !password) {
      alert('Please fill in all the info');
      return;
    }

    const loginUser: User = { username, password };

    this.repository.loginUser(loginUser).subscribe(
      (data: any) => {
        console.log(data);
        if (data.success) {
          localStorage.setItem('access_token', data.accessToken);
          localStorage.setItem('user_role', data.user?.role);
          localStorage.setItem('user_id', data.user?.id);
          window.location.href = window.location.origin + '/home';
        } else {
          alert(data.msg);
        }
      },
      (err: any) => {
        console.log(err);
        const msg = err.error.msg || 'Failed to login';
        alert(msg);
      }
    );
  }
}
