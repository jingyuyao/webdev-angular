import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  getOptions = {
    withCredentials: true,
  };
  postOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true,
  };

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.getUrl('/api/register'), user, this.postOptions);
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.getUrl('/api/login'), user, this.postOptions);
  }

  logout(): Observable<any> {
    return this.http.post<any>(this.getUrl('/api/logout'), {}, this.postOptions);
  }

  loggedIn(): Observable<LoggedInUser> {
    return this.http.get<LoggedInUser>(this.getUrl('/api/loggedIn'), this.getOptions);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(this.getUrl('/api/profile'), this.getOptions);
  }

  updateProfile(user: User): Observable<User> {
    return this.http.put<User>(this.getUrl('/api/profile'), user, this.postOptions);
  }

  private getUrl(path: string): string {
    return this.configService.getStudentApiUrl(path);
  }
}

export interface User {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  role?: string;
  dateOfBirth?: Date;
}

export interface LoggedInUser {
  userId: string;
}
