import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { StudentService, Section } from '../services/student.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {
  enrollmentSections: EnrollmentSection[] = [];

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.refreshSections();
  }

  refreshSections() {
    const userId = this.route.snapshot.data.loggedInUser.userId;
    this.studentService
      .getEnrollments(userId)
      .subscribe(enrollments => {
        const courseId = Number(this.route.snapshot.paramMap.get('id'));
        const enrolled = enrollments.find(enrollment => enrollment.courseId === courseId);
        this.studentService
          .getSections(courseId)
          .subscribe(sections => {
            this.enrollmentSections = sections.map(section => {
              return {
                section: section,
                canEnroll: !enrolled,
                canUnenroll: enrolled && enrolled._id === section._id,
              };
            });
          });
      });
  }

  enroll(section: Section) {
    const userId = this.route.snapshot.data.loggedInUser.userId;

    this.studentService
      .enroll(section._id, userId)
      .subscribe(() => this.refreshSections());
  }

  unenroll(section: Section) {
    const userId = this.route.snapshot.data.loggedInUser.userId;

    this.studentService
      .unenroll(section._id, userId)
      .subscribe(() => this.refreshSections());
  }

  back() {
    this.location.back();
  }
}

interface EnrollmentSection {
  section: Section;
  canEnroll: boolean;
  canUnenroll: boolean;
}
