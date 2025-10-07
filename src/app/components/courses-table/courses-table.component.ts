import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent implements OnInit {
courses:any=[];
path!:string

  constructor(private courseService : CourseService,private router : Router,private activatedRoute : ActivatedRoute) { }

  ngOnInit(){
    this.path=this.router.url
    if (this.router.url=="/admin") {
      this.courseService.getAllCourses().subscribe(
        (data)=>{
          console.log("here is response from BE after getting all courses",data);
          this.courses=data.tab;
        }
      )
    }
    else if (this.router.url=="/dashboardTeacher") {
      let token:any=sessionStorage.getItem("token")
      console.log("here is teacher",token);
      let teacher:any=jwtDecode(token);
      console.log("here is teacher",teacher);
      
      this.courseService.getAllTeacherCourses(teacher.id).subscribe(
        (data)=>{
          console.log("here is response from BE after getting all courses",data);
          this.courses=data.tab;
        }
      )
    }
    
  }
  delete(id:string){
   this.courseService.deleteCourse(id).subscribe(
    (response)=>{
      console.log("here is response from BE after deliting course",response);
      if (response.msg=="success") {
        this.courseService.getAllCourses().subscribe(
          (data)=>{
            console.log("here is response from BE after getting all courses",data);
            this.courses=data.tab;
          }
        )
      }
    }
   )
  }
  display(id:string){
   this.router.navigate([`courseDetail/${id}`])
  }
  edit(id:string){
    this.router.navigate([`editCourse/${id}`])
  }
  GoToGrades(courseId:string,studentId:string){
    this.router.navigate([`addGrade/${courseId}/${studentId}`])
  }
  sortDurationCroissant(){
    this.courseService.getAllCoursesDurationCroissant().subscribe(
      (data)=>{
        console.log("here is response from BE after getting all courses",data);
        this.courses=data.tab;
      }
    )
  }
  sortDurationDecroissant(){
    this.courseService.getAllCoursesDurationDecroissant().subscribe(
      (data)=>{
        console.log("here is response from BE after getting all courses",data);
        this.courses=data.tab;
      }
    )
  }

}
