import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TeacherService, Module, Lesson } from '../services/teacher.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  modules: Module[] = [];
  lessons: Lesson[] = [];

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.teacherService
      .getModules(id)
      .subscribe(modules => this.modules = modules);
  }

  openModule(module: Module) {
    this.teacherService
      .getLessons(module.id)
      .subscribe(lessons => this.lessons = lessons);
  }
}
