import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { jwtDecode } from "jwt-decode";
const Swal = require('sweetalert2')
@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  idForm!: FormGroup;
  course: any = {};
  id!:any
  constructor(private courseService :CourseService,private activatedRoute : ActivatedRoute,private router : Router) { }

  ngOnInit(){
    this.id=this.activatedRoute.snapshot.paramMap.get('id')
    this.courseService.getCourseById(this.id).subscribe(
      (data)=>{
        console.log("here is response from BE after getting course",data);
        this.course=data.user;
      }
    )
  }
  updateCourse(){
    let token:any=sessionStorage.getItem("token")
      console.log("here is token",token);
      let user:any=jwtDecode(token);
      console.log("here is user",user);
      if (this.course.duration>0 && this.course.duration<7) {
        this.courseService.updateCourse(this.course).subscribe(
          (result)=>{
            console.log("here is response from BE after updating course",result);
            if (result.msg=="success") {
              if (user.role=="admin") {
                this.router.navigate(['admin']);
              } else {
                this.router.navigate(['dashboardTeacher']);
              }
              
            }
          }
        )
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Duration should be greater than 0 and less than 6 months!",
        });
      }
 
  }
}
