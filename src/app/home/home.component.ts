import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TeacherService, Course } from '../services/teacher.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  courses: Course[] = [];

  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.data);

    this.teacherService
      .getCourses()
      .subscribe(courses => this.courses = courses);
  }
}
