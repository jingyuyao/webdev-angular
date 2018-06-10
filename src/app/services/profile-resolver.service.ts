import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { StudentService, User } from './student.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolver implements Resolve<User> {
  constructor(private studentService: StudentService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.studentService.getProfile().pipe(
      catchError(() => of(null))
    );
  }
}
