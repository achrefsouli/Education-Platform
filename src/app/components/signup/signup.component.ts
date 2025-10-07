import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
const Swal = require('sweetalert2')
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  route!: string;
  file!: File;
  signupForm!: FormGroup;
  errorMsg!:string;
  cvFile!:File;
  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.route = this.router.url
    console.log("here is path", this.route);
    if (this.route == "/signup") {
      this.signupForm = this.formBuilder.group({
        fName: ['', [Validators.required, Validators.minLength(3)]],
        lName: ['', [Validators.required, Validators.minLength(3)]],
        motherName: ['', [Validators.required, Validators.minLength(3)]],
        fatherName: ['', [Validators.required, Validators.minLength(3)]],
        adresse: ['', [Validators.required, Validators.minLength(5)]],
        tel: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/)]],
        role :['student'],
      })
    } else if (this.route == "/signupTeacher") {
      this.signupForm = this.formBuilder.group({
        fName: ['', [Validators.required, Validators.minLength(3)]],
        lName: ['', [Validators.required, Validators.minLength(3)]],
        adresse: ['', [Validators.required, Validators.minLength(5)]],
        tel: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/)]],
        specialite:['', [Validators.required, Validators.minLength(4)]],
        role :['teacher'],
        statut:['notVerified'],
      })
    }
    else if (this.route == "/signupParent") {
      this.signupForm = this.formBuilder.group({
        fName: ['', [Validators.required, Validators.minLength(3)]],
        lName: ['', [Validators.required, Validators.minLength(3)]],
        adresse: ['', [Validators.required, Validators.minLength(5)]],
        tel: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/)]],
        telChild: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
        role :['parent'],
      })
    }
    else  {
      this.signupForm = this.formBuilder.group({
        fName: ['', [Validators.required, Validators.minLength(3)]],
        lName: ['', [Validators.required, Validators.minLength(3)]],
        tel: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/)]],
        role :['admin'],
      })
    }
  }
  signup() {
    console.log("here is signup form", this.signupForm.value);
    if (!this.file &&(this.route == "/signup" ||this.route=="/signupTeacher" )) {
      if (this.route == "/signup"){
        Swal.fire({
          title: 'profile picture required!',
          text: 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'yes'
        })
      }
      else if (this.route=="/signupTeacher")   
      {
        Swal.fire({
          title: 'CV required"!',
          text: 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'yes'
        })
      }
      
    } else {
      this.userService.signup(this.signupForm.value,this.file).subscribe(
        (response)=>{
          console.log("here is response from BE after adding user",response);
          if (response.msg == "user added") {
            this.router.navigate([`login`])
          }
          else if (response.msg=="user already exist") {
            this.errorMsg="tel already in use"
          }
          else if (response.msg=="student doesn't exist") {
            this.errorMsg="student doesn't exist";
          }
          else if (response.msg=="email already used") {
            this.errorMsg="email already used";
          }
          else{
            this.errorMsg="signup error";
          }
        }
      );
    }
  
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
      this.file = inputElement.files[0];
    }

  }
}
