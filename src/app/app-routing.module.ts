import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedInUserResolver } from './services/logged-in-user-resolver.service';
import { ProfileResolver } from './services/profile-resolver.service';
import { AuthGuard } from './services/auth-guard.service';
import { AdminGuard } from './services/admin-guard.service';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { SectionsComponent } from './sections/sections.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    resolve: {
      loggedInUser: LoggedInUserResolver
    },
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: ProfileResolver
    },
  },
  {
    path: 'course/:id/sections',
    component: SectionsComponent,
    canActivate: [AuthGuard],
    resolve: {
      loggedInUser: LoggedInUserResolver
    },
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
