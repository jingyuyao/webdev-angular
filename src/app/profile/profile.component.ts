import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { StudentService, User } from '../services/student.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getProfile().subscribe(user => this.user = user);
  }

  submit(profileForm: NgForm) {
  }
}
