import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CurrentUserResolver } from './services/current-user-resolver.service';
import { AuthGuard } from './services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    resolve: {
      currentUser: CurrentUserResolver
    },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'course/:id',
    component: CourseComponent
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
