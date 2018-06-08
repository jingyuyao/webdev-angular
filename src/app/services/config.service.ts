import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  getStudentApiUrl(path: string): string {
    return environment.studentApiUrl + path;
  }

  getTeacherApiUrl(path: string): string {
    return 'https://jingyuyao-webdev-1.herokuapp.com' + path;
  }
}
