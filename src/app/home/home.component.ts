import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TeacherService, Course } from '../services/teacher.service';
import { StudentService, Section, LoggedInUser } from '../services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  enrollments: Section[] = [];
  courses: Course[] = [];
  loggedInUser?: LoggedInUser;

  constructor(
    private teacherService: TeacherService,
    private studentService: StudentService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loggedInUser = this.route.snapshot.data.loggedInUser;

    this.teacherService
      .getCourses()
      .subscribe(courses => this.courses = courses);

    if (this.loggedInUser) {
      this.studentService
        .getEnrollments(this.loggedInUser.userId)
        .subscribe(enrollments => this.enrollments = enrollments);
    }
  }
}
