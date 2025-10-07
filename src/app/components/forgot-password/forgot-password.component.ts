import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as e from 'express';
import { UserService } from 'src/app/services/user.service';
const Swal = require('sweetalert2')
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgetForm!:FormGroup;
  email!:string
  constructor(private userService : UserService,private router : Router) { }

  ngOnInit(): void {
  }
  goToReset(){
    this.userService.resetPassword(this.email).subscribe(
      (response)=>{
        console.log("here is response from BE",response);
        if (response.msg=="Password reset link sent to your email") {
          Swal.fire({
            title: "Password reset link sent to your email",
            icon: "success",
            draggable: true
          });
        } else if (response.msg=="user not found") {
          Swal.fire({
            title: 'user not found"!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'yes'
          })
        } 
        
      }
    )
  }
}
