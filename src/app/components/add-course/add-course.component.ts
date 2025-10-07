import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
const Swal = require('sweetalert2')
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  idForm!: FormGroup;
  course: any = {};
  user!:any;
  errorMsg:string="";
  constructor(private courseService: CourseService,private router : Router) { }

  ngOnInit(): void {
  }
  addCourse() {
    this.user=sessionStorage.getItem("token");
    let decodedToken:any =jwtDecode(this.user);
    console.log("here is decode token",decodedToken);
    console.log("here is course", this.course);
    this.course.teacherId=decodedToken.id;
    if (this.course.duration>0 && this.course.duration<7) {
      this.courseService.addCourse(this.course).subscribe(
        (response)=>{
          console.log("here is response from BE after adding course",response);
         if (response.msg=="course added") {
          this.router.navigate(['dashboardTeacher']);
         }
         else if (response.msg=="user not found") {
          this.errorMsg="user not found";
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "user Not Found",
          });
         }
         else{
          this.errorMsg="error"
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
         }
        }
      );
    }
    else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Duration should be greater than 0 and less than 6 months!",
      });
    }
   
  }
  getAllCourses(){}

}
