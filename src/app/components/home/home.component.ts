import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { jwtDecode } from "jwt-decode";
import { CourseService } from 'src/app/services/course.service';
import { GradeService } from 'src/app/services/grade.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
searchForm!:FormGroup
tel!:number;
student!:any;
user!:any;
grades:any=[];
errorMsg:string="";
  constructor(private userService : UserService,private gradeService:GradeService) { }

  ngOnInit(): void {
  }
  isLoggedIn():any{
    let token = sessionStorage.getItem("token");
    if (token) {
      this.user=jwtDecode(token);
    }
    return !!token;
  }
  searchStudent(){
  console.log("here is telephone ",this.tel);
  this.userService.getUserByTel(this.tel).subscribe(
    (data)=>{
      console.log("here is response from BE after searching for child",data);
      
      if (data.msg=="error") {
        this.errorMsg="user not found"
      } else {
        if (data.user.role=="student") {
          this.student=data.user
          for (let i = 0; i < data.user.gradeIds.length; i++) {
            this.gradeService.getGradeById(data.user.gradeIds[i]._id).subscribe(
              (data)=>{
                console.log("here is BE response after getting grade",data);
                this.grades.push(data.grade);
              }
            )
            
          }
          this.errorMsg=""
        }
        else{
          this.student={}
          this.errorMsg="user not found"
        }
        
      }
    }
  )
  }


}
