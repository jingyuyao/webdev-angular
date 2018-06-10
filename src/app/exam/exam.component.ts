import { Component, OnInit, Input } from '@angular/core';

import { TeacherService, Widget, Question } from '../services/teacher.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  @Input() widget: Widget;
  questions: Question[] = [];

  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
    this.teacherService
      .getQuestions(this.widget.id)
      .subscribe(questionsResponse => this.questions = questionsResponse.questions);
  }
}
