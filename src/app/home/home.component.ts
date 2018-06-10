import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TeacherService, Course } from '../services/teacher.service';
import { User } from '../services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  courses: Course[] = [];
  currentUser?: User;

  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.currentUser = this.route.snapshot.data.currentUser;

    this.teacherService
      .getCourses()
      .subscribe(courses => this.courses = courses);
  }
}
