import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { StudentService, User } from '../services/student.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = {
    username: '',
    password: '',
  };
  showLoginError = false;

  constructor(
    private studentService: StudentService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  submit(loginForm: NgForm) {
    this.showLoginError = false;
    this.studentService
      .login(this.user)
      .subscribe(
        () => this.router.navigate(['/profile']),
        () => {
          this.showLoginError = true;
          loginForm.resetForm();
        },
      );
  }
}
