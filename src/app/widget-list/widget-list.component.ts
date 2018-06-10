import { Component, OnInit, Input } from '@angular/core';

import { TeacherService, Lesson, Widget } from '../services/teacher.service';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {
  @Input() lesson: Lesson;
  widgets: Widget[] = [];

  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
    this.teacherService
      .getWidgets(this.lesson.id)
      .subscribe(widgetsResponse => {
        const sorted = [...widgetsResponse.widgets];
        sorted.sort((l, r) => l.position - r.position);
        this.widgets = sorted;
      });
  }
}
