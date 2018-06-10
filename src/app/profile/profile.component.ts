import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { StudentService, User } from '../services/student.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.user = this.route.snapshot.data.user;
  }

  submit(profileForm: NgForm) {
  }
}
