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
    private configService: ConfigService,
  ) { }

  getCourses(): Observable<Course[]> {
    return this.getTeacherApi<Course[]>('/api/course');
  }

  getModules(courseId: number): Observable<Module[]> {
    return this.getTeacherApi<Module[]>(`/api/course/${courseId}/modules`);
  }

  private getTeacherApi<T>(path: string): Observable<T> {
    return this.http.get<T>(this.configService.getTeacherApiUrl(path));
  }
}

export interface Course {
  id: number;
  title: string;
  created: string;
  modified: string;
}

export interface Module {
  id: number;
  title: string;
}
