import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
const Swal = require('sweetalert2')
@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
users:any=[];
courses:any=[];
selectedcourse:string="";
errorMsg:string="";
  constructor(private userService : UserService,private router : Router,private courseService : CourseService) { }
  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      (data)=>{
        console.log("here is response from BE after getting all users",data);
        this.users=data.tab;
      }
    )
    this.courseService.getAllCourses().subscribe(
      (data)=>{
        console.log("here is response from BE after getting all courses",data);
        this.courses=data.tab;
      }
    )
  }
  verify(user:any){
    user.statut="verified";
  this.userService.updateStatut(user).subscribe(
    (response)=>{
      console.log("here is response from BE after updating statut");
      if (response.msg=="success") {
        this.userService.getAllUsers().subscribe(
          (data)=>{
            console.log("here is response from BE after getting all users",data);
            this.users=data.tab;
          }
        )
      }
    }
  )
  }
  delete(id:string){
    this.userService.deleteUserById(id).subscribe(
      (response)=>{
        console.log("here is response from BE after deleting user",response);
        if (response.msg=="success") {
          this.userService.getAllUsers().subscribe(
            (data)=>{
              console.log("here is response from BE after getting all users",data);
              this.users=data.tab;
            }
          )
        }
        
      }
    )
  }
  edit(id:string){
   this.router.navigate([`editUser/${id}`])
  }
  selectedCourse(id:string){
  console.log("selected",id);
  this.selectedcourse=id
  }
  affecterCours(user:any){
    if (!user.courseIds.includes(this.selectedcourse) ) {
      user.courseIds.push(this.selectedcourse);
      console.log("here is user after adding course id",user);
      this.userService.affectCourse(user).subscribe(
        (response)=>{
          console.log("here is response from BE after updating user",response);
          if (response.msg=="course not found") {
            this.errorMsg="course not found"
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "course not found",
            });
          }
         else if (response.msg=="success") {
            this.userService.getAllUsers().subscribe(
              (data)=>{
                console.log("here is response from BE after getting all users",data);
                this.users=data.tab;
              }
            )
            Swal.fire({
              title: "Course affected succesfully!",
              icon: "success",
              draggable: true
            });
          }
          else{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "error",
            });
          }
          
        }
      )
    }
    else{
      this.errorMsg="course already affected"
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "course already affected to this student",
      });
    }
   
    
  }
  getTeachers(){
    this.userService.getAllTeachers().subscribe(
      (data)=>{
        console.log("here is response from BE after getting all users",data);
        this.users=data.tab;
      }
    )
  }
  getStudents(){
    this.userService.getAllStudents().subscribe(
      (data)=>{
        console.log("here is response from BE after getting all users",data);
        this.users=data.tab;
      }
    )
  }
  getParents(){
    this.userService.getAllParents().subscribe(
      (data)=>{
        console.log("here is response from BE after getting all users",data);
        this.users=data.tab;
      }
    )
  }

}
