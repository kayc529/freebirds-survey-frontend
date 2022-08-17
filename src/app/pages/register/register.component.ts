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

    const registerUser: User = {
      id: '',
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
}
