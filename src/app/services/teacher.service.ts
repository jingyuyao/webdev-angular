import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(
      this.configService.getTeacherApiUrl('/api/course'));
  }
}

export interface Course {
  id: Number;
  title: String;
  created: String;
  modified: String;
}
