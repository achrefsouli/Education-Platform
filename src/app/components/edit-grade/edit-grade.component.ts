import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { GradeService } from 'src/app/services/grade.service';
const Swal = require('sweetalert2')
import { jwtDecode } from "jwt-decode";
@Component({
  selector: 'app-edit-grade',
  templateUrl: './edit-grade.component.html',
  styleUrls: ['./edit-grade.component.css']
})
export class EditGradeComponent implements OnInit {
  grade: any = {};
  id!: any;
  constructor(private activatedRoute: ActivatedRoute,private gradeService :GradeService,private router : Router) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    console.log("here is id", this.id);
   this.gradeService.getGradeById(this.id).subscribe(
    (data)=>{
      console.log("here is response from BE after getting grade",data.grade);
      this.grade=data.grade
      
    }
   )
  }
  
  editGrade() {
   this.gradeService.updateGrade(this.grade).subscribe(
    (response)=>{
      console.log("here is response from BE after updating grade",response);
      let token:any = sessionStorage.getItem("token");
      let user:any=jwtDecode(token);
      console.log("here is user",user);
      if (response.msg=="success") {
        if (user.role=="teacher") {
          this.router.navigate(['dashboardTeacher']);
        } else {
          this.router.navigate(['admin']);
        }
        
      } else {
        Swal.fire({
          title: 'Error"!',
          text: 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'yes'
        })
      }
      
    }
   )

}}
