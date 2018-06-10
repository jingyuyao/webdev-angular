import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { StudentService, LoggedInUser } from './student.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserResolver implements Resolve<LoggedInUser> {
  constructor(private studentService: StudentService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LoggedInUser> {
    return this.studentService.loggedIn().pipe(
      catchError(() => of(null))
    );
  }
}
