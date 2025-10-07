import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GradeService } from 'src/app/services/grade.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
const Swal = require('sweetalert2')
@Component({
  selector: 'app-add-grade',
  templateUrl: './add-grade.component.html',
  styleUrls: ['./add-grade.component.css']
})
export class AddGradeComponent implements OnInit {
  gradeForm!:FormGroup;
  grade:any={}
  errorMsg:string="";
  constructor(private activatedRoute:ActivatedRoute,private gradeService : GradeService,private router : Router,private notiService:NotificationService,private userService:UserService) { }

  ngOnInit(): void {
  }
  addGrade(){
    let courseId = this.activatedRoute.snapshot.paramMap.get("cid");
    let studentId= this.activatedRoute.snapshot.paramMap.get("sid");
    this.grade.studentId=studentId;
    this.grade.courseId=courseId;
    console.log("here is grade",this.grade);
    this.gradeService.addGrade(this.grade).subscribe(
      (response)=>{
        console.log("here is response from BE after adding Grade",response);
        if (response.msg=="user not found") {
          this.errorMsg="student not found"
          Swal.fire({
            title: 'student not found"!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'yes'
          })
        } else  if (response.msg=="course not found") {
         
          Swal.fire({
            title: 'course not found"!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'yes'
          })
        }
        else  if (response.msg=="student already graded") {
        
          Swal.fire({
            title: 'student already graded"!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'yes'
          })
        }
        else  if (response.msg=="grade not saved") {

          Swal.fire({
            title: 'grade not saved"!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'yes'
          })
        }
        else{
         this.userService.getUserById(this.grade.studentId).subscribe(
          (foundUser)=>{
            console.log("here is found user",foundUser);
            if (foundUser.user) {
              this.notiService.sendMessage(foundUser.user).subscribe(
                (result)=>{
                  console.log("here is result after sending sms"); 
                }
              )
            }
            
          }
         )
          this.router.navigate(['dashboardTeacher']);
        }
        
      }
    )
    
  }
}
