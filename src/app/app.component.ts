import { Component, OnInit } from '@angular/core';

import { TeacherService, Course } from './services/teacher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  courses: Course[] = [];

  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
    this.teacherService
      .getCourses()
      .subscribe(courses => this.courses = courses);
  }
}
