import { Component } from '@angular/core';

import { TeacherService, Course } from '../services/teacher.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private teacherService: TeacherService) { }

  courses = this.teacherService.getCourses();

  onCourseSelect(course) {
    console.log(course);
  }
}
