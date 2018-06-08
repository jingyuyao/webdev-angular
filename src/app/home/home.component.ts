import { Component, OnInit } from '@angular/core';

import { TeacherService, Course } from '../services/teacher.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  courses: Course[] = [];

  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
    this.teacherService
      .getCourses()
      .subscribe(courses => this.courses = courses);
  }

  onCourseSelect(course) {
    console.log(course);
  }
}
