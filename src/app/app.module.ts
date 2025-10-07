import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { InstructorsComponent } from './components/instructors/instructors.component';
import { TeacherInfoComponent } from './components/teacher-info/teacher-info.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { HomeComponent } from './components/home/home.component';
import { AllcoursesComponent } from './components/allcourses/allcourses.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContaactFormComponent } from './components/contaact-form/contaact-form.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { UsersTableComponent } from './components/users-table/users-table.component';
import { JoinUsComponent } from './components/join-us/join-us.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { AddGradeComponent } from './components/add-grade/add-grade.component';
import { EditGradeComponent } from './components/edit-grade/edit-grade.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { SearchBookComponent } from './components/search-book/search-book.component';
import { GradesTableComponent } from './components/grades-table/grades-table.component';
import { SearchTeacherComponent } from './components/search-teacher/search-teacher.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminChartComponent } from './components/admin-chart/admin-chart.component';
import { ContactTableComponent } from './components/contact-table/contact-table.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    AboutUsComponent,
    InstructorsComponent,
    TeacherInfoComponent,
    CoursesComponent,
    CourseInfoComponent,
    HomeComponent,
    AllcoursesComponent,
    LoginComponent,
    SignupComponent,
    AboutComponent,
    ContactComponent,
    ContaactFormComponent,
    TeachersComponent,
    CourseDetailComponent,
    AdminComponent,
    AddTeacherComponent,
    AddCourseComponent,
    CoursesTableComponent,
    UsersTableComponent,
    JoinUsComponent,
    EditUserComponent,
    EditCourseComponent,
    TeacherDashboardComponent,
    AddGradeComponent,
    EditGradeComponent,
    StudentDashboardComponent,
    SearchBookComponent,
    GradesTableComponent,
    SearchTeacherComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProfileComponent,
    AdminChartComponent,
    ContactTableComponent

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
