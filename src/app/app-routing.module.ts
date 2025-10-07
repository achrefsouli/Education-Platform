import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AllcoursesComponent } from './components/allcourses/allcourses.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { JoinUsComponent } from './components/join-us/join-us.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { AddGradeComponent } from './components/add-grade/add-grade.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { SearchBookComponent } from './components/search-book/search-book.component';
import { EditGradeComponent } from './components/edit-grade/edit-grade.component';
import { SearchTeacherComponent } from './components/search-teacher/search-teacher.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminChartComponent } from './components/admin-chart/admin-chart.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"courses",component:AllcoursesComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"signupTeacher",component:SignupComponent},
  {path:"signupAdmin",component:SignupComponent},
  {path:"signupParent",component:SignupComponent},
  {path:"aboutus",component:AboutComponent},
  {path:"contact",component:ContactComponent},
  {path:"teachers",component:TeachersComponent},
  {path:"courseDetail/:id",component:CourseDetailComponent},
  {path:"admin",component:AdminComponent},
  {path:"addcourse",component:AddCourseComponent},
  {path:"joinus",component:JoinUsComponent},
  {path:"editUser/:id",component:EditUserComponent},
  {path:"editCourse/:id",component:EditCourseComponent},
  {path:"dashboardTeacher",component:TeacherDashboardComponent},
  {path:"addGrade/:cid/:sid",component:AddGradeComponent},
  {path:"dashboardStudent",component:StudentDashboardComponent},
  {path:"searchBook",component:SearchBookComponent},
  {path:"editGrade/:id",component:EditGradeComponent},
  {path:"searchTeacher",component:SearchTeacherComponent},
  {path:"forgotPassword",component:ForgotPasswordComponent},
  {path:"resetPassword/:token",component:ResetPasswordComponent},
  {path:"profile",component:ProfileComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
