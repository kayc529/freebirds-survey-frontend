import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserRepository } from 'src/app/models/user.repository';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private repository: UserRepository,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register(): void {
    //get the form element
    let registerForm = document.getElementById('register-form');
    let existingID: User[] = [];

    const firstName =
      (<HTMLInputElement>document.getElementById('input-firstname'))?.value ||
      '';
    const lastName =
      (<HTMLInputElement>document.getElementById('input-lastname'))?.value ||
      '';
    const username =
      (<HTMLInputElement>document.getElementById('input-username'))?.value ||
      '';
    const password =
      (<HTMLInputElement>document.getElementById('input-password'))?.value ||
      '';
    const email =
      (<HTMLInputElement>document.getElementById('input-email'))?.value || '';

    //check the values are filled
    if (!firstName || !lastName || !username || !password || !email) {
      alert('Please fill in all the info');
      return;
    }

    //check length of username
    if (username.trim().length < 5) {
      alert('Your username should have at least 5 characters');
      return;
    }

    //check length of password
    if (password.trim().length < 6) {
      alert('Your password should have at least 6 characters');
      return;
    }

    //validate email address
    if (!this.validateEmail(email)) {
      alert('Please input a valid email');
      return;
    }

    const registerUser: User = {
      username,
      password,
      email,
      firstName,
      lastName,
    };

    this.repository.registerUser(registerUser).subscribe(
      (data: any) => {
        alert('Registered!');
        location.href = '/login';
      },
      (err: any) => {
        console.log(err);
        const msg = err.error.msg || 'Failed to register!';
        alert(msg);
      }
    );
  }

  private validateEmail(email: string): boolean {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
}
