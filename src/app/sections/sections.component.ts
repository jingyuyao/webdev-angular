import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StudentService, Section } from '../services/student.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {
  sections: Section[] = [];

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.refreshSections();
  }

  refreshSections() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService
      .getSections(id)
      .subscribe(sections => this.sections = sections);
  }

  enroll(section: Section) {
    const userId = this.route.snapshot.data.loggedInUser.userId;

    this.studentService
      .enroll(section._id, userId)
      .subscribe(() => this.refreshSections());
  }
}
