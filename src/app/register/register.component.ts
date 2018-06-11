import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { StudentService, User } from '../services/student.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = {
    username: '',
    password: '',
  };

  constructor(
    private studentService: StudentService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  submit(registerForm: NgForm) {
    this.studentService
      .register(this.user)
      .subscribe(
        () => this.router.navigate(['/profile']),
        () => {
          registerForm.resetForm();
          alert('Register failed');
        },
      );
  }
}
