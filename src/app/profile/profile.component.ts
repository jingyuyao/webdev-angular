import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { StudentService, User } from '../services/student.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  showError = false;
  updated = false;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.user = this.route.snapshot.data.user;
  }

  logout() {
    this.studentService
      .logout()
      .subscribe(
        () => this.router.navigate(['/login']),
        () => console.log('no way'),
      );
  }

  submit(profileForm: NgForm) {
    this.showError = false;
    this.updated = false;
    this.studentService
      .updateProfile(this.user)
      .subscribe(
        user => {
          this.user = user;
          this.updated = true;
        },
        () => this.showError = true,
      );
  }
}
