import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { StudentService, Section } from '../services/student.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  @Input() section: Section;
  @Output() deleted = new EventEmitter<any>();

  constructor(private studentService: StudentService) { }

  ngOnInit() {
  }

  submit(sectionForm: NgForm) {
    this.studentService
      .updateSection(this.section)
      .subscribe(section => {
        this.section = section;
        alert('Updated section');
      });
  }

  remove() {
    this.studentService
      .deleteSection(this.section)
      .subscribe(() => this.deleted.emit(null));
  }
}
