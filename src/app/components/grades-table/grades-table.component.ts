import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GradeService } from 'src/app/services/grade.service';
import { jwtDecode } from "jwt-decode";
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-grades-table',
  templateUrl: './grades-table.component.html',
  styleUrls: ['./grades-table.component.css']
})
export class GradesTableComponent implements OnInit {
grades:any=[];
courses:any=[];
path!:string
  constructor(private gradeService : GradeService,private router :Router,private userService:UserService) { }

  ngOnInit() {
    this.path = this.router.url
    console.log(this.path);  
    if (this.path=="/admin") {
      this.gradeService.getAllGrades().subscribe(
        (data)=>{
          this.grades=data.tab;
        }
      )
    } else {
      let token:any = sessionStorage.getItem("token");
      let teacher:any=jwtDecode(token);
      console.log("here is teacher",teacher);
      this.userService.getUserById(teacher.id).subscribe(
        (foundUser)=>{
          console.log("here is found Teacher",foundUser);
          this.gradeService.getAllGrades().subscribe(
            (data)=>{
              console.log("here is response after getting all grades",data.tab);
              for (let i = 0; i < foundUser.user.courseIds.length; i++) {
                for (let j = 0; j < data.tab.length; j++) {
                  if (data.tab[j].courseId._id==foundUser.user.courseIds[i]._id) {
                    this.grades.push(data.tab[j]);
                  }
                  
                }
                
              }
            }
          )
        }
      ) 
    }
   
  }
delete(id:string){
  if (this.path=="admin") {
  this.gradeService.deleteGradeById(id).subscribe(
    (response)=>{
      console.log("here is response from BE after deleting grade",response);
      if (response.msg=="success") {
        this.gradeService.getAllGrades().subscribe(
          (data)=>{
            this.grades=data.tab;
          }
        )
      }
      
    }
  )}
  else{
    this.gradeService.deleteGradeById(id).subscribe(
      (response)=>{
        console.log("here is response from BE after deleting grade",response);
        if (response.msg=="success") {
          let token:any = sessionStorage.getItem("token");
      let teacher:any=jwtDecode(token);
      console.log("here is teacher",teacher);
      this.userService.getUserById(teacher.id).subscribe(
        (foundUser)=>{
          console.log("here is found Teacher",foundUser);
          this.gradeService.getAllGrades().subscribe(
            (data)=>{
              console.log("here is response after getting all grades",data.tab);
              this.grades=[];
              for (let i = 0; i < foundUser.user.courseIds.length; i++) {
                for (let j = 0; j < data.tab.length; j++) {
                  if (data.tab[j].courseId._id==foundUser.user.courseIds[i]._id) {
                    this.grades.push(data.tab[j]);
                  }
                  
                }
                
              }
            }
          )
        }
      ) 
        }
  })
}}
edit(id:string){
this.router.navigate([`editGrade/${id}`]);
}
sortCroissant(){
  this.gradeService.getAllGradesCroissant().subscribe(
    (data)=>{
      this.grades=data.tab;
    }
  )
}
sortDecroissant(){
  this.gradeService.getAllGradesDesc().subscribe(
    (data)=>{
      this.grades=data.tab;
    }
  )
}
}
