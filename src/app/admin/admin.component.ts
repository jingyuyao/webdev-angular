import { Component, OnInit } from '@angular/core';

import { TeacherService, Course } from '../services/teacher.service';
import { StudentService, Section } from '../services/student.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  courses: Course[] = [];
  sections: Section[] = [];
  selectedCourse: Course;

  constructor(
    private teacherService: TeacherService,
    private studentService: StudentService,
  ) { }

  ngOnInit() {
    this.teacherService
      .getCourses()
      .subscribe(courses => this.courses = courses);
  }

  openCourse(course: Course) {
    this.selectedCourse = course;
    this.studentService
      .getSections(course)
      .subscribe(sections => this.sections = sections);
  }

  refreshSections() {
    this.studentService
      .getSections(this.selectedCourse)
      .subscribe(sections => this.sections = sections);
  }
}
