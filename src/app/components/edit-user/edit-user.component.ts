import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { actualPrimitives } from 'mongoose';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import { jwtDecode } from "jwt-decode";
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: any = {};
  id!: any;
  signupForm!: FormGroup;
  errorMsg!: string;
  file!: File;
  cvFile!: File;
  pass!: string
  courses: any = []
  connectedUser!: any
  constructor(private activatedroute: ActivatedRoute, private userService: UserService, private courseService: CourseService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {

    this.id = this.activatedroute.snapshot.paramMap.get('id');
    this.userService.getUserById(this.id).subscribe(
      (data) => {
        console.log("here is response from BE after getting user", data);
        this.user = data.user;
        if (data.user.role == "student") {
          this.courseService.getAllCourses().subscribe(
            (data) => {
              console.log("here is response from BE after getting all courses", data);
              this.courses = data.tab;
            }
          )
        }
      }
    )




  }
  editUser() {
    console.log("here is user", this.user);
    this.userService.updateUserById(this.user, this.file).subscribe(
      (response) => {
        console.log("here is response from BE after updating user", response);
        if (response.msg == "success") {
          let token: any = sessionStorage.getItem("token");
            this.connectedUser = jwtDecode(token);
          
          if (this.connectedUser.role=="admin") {
            this.router.navigate(['admin']);
          }
          else{
            this.router.navigate(['profile']);
          }
         
        }

      }
    );

  }
  onImageSelected(event: Event) {
    console.log("here is selected photo", event);
    const inputElement = event.target as HTMLInputElement
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
    }

  }
  onCvSelected(event: Event) {
    console.log("here is selected photo", event);
    const inputElement = event.target as HTMLInputElement
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      this.cvFile = inputElement.files[0];
    }

  }
}
