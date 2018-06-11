import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  newSection: Section;

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
    this.refreshSections();
  }

  refreshSections() {
    this.studentService
      .getSections(this.selectedCourse)
      .subscribe(sections => {
        this.sections = sections;
        this.newSection = {
          courseId: this.selectedCourse.id,
          title: `${this.selectedCourse.title} Section ${sections.length + 1}`,
          maxSeats: 10,
          enrollments: [],
        };
      });
  }

  submit(newSectionForm: NgForm) {
    this.studentService
      .createSection(this.newSection)
      .subscribe(() => this.refreshSections());
  }
}
