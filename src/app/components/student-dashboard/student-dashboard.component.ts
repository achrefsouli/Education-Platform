import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { jwtDecode } from "jwt-decode";
import { GradeService } from 'src/app/services/grade.service';
@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  courses:any=[];
  grades:any=[];
  constructor(private usersService : UserService,private gradeService:GradeService) { }

  ngOnInit(){
    let Token:any =sessionStorage.getItem("token");
    let decodedToken:any =jwtDecode(Token);
    console.log("here is student",decodedToken);
    console.log("courses",this.courses,"grades",this.grades);
    this.usersService.getUserById(decodedToken.id).subscribe(
      (data)=>{
        console.log("here is student from BE",data.user);
        this.courses=data.user.courseIds
      }
    )
    this.gradeService.getGradeByStudentId(decodedToken.id).subscribe(
      (data)=>{
       console.log("here is response from BE after getting grades",data.tab);
       this.grades=data.tab;
      }
    )
    
    
  }

}
