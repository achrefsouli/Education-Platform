import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { jwtDecode } from "jwt-decode";
const Swal = require('sweetalert2')
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  user:any={};
  constructor(private userService : UserService,private router : Router) { }
  errorMsg!:string;
  ngOnInit(): void {
    
  }
  login(){
    console.log("here is  user",this.user);
    if (!this.user.tel && !this.user.password ){
      Swal.fire({
        title: 'you forgot to enter your info!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'yes'
      })
    } else {
      this.userService.login(this.user).subscribe(
        (response)=>{
          console.log("here is response from BE after login",response);
          if (response.msg=="success") {
               console.log("here is token from BE",response.user);
               sessionStorage.setItem("token",response.user);
               let decodedToken:any =jwtDecode(response.user);
               console.log("here is decode token",decodedToken);
               if (decodedToken.role=="teacher") {
                if (decodedToken.statut=="notVerified") {
                  this.errorMsg="wait until you are verified by admin";
                } else {
                  this.router.navigate(['dashboardTeacher']);
                }
                
               }
               if (decodedToken.role=="student") {
               
                  this.router.navigate(['dashboardStudent']);
                
                
               }
               if (decodedToken.role=="parent") {
               
                this.router.navigate(['']);
              
              
             }
             if (decodedToken.role=="admin") {
               
              this.router.navigate(['admin']);
            
            
           }
          }
          else{
            this.errorMsg="verify your info"
            Swal.fire({
              title: 'verify your info!',
              text: 'Do you want to continue',
              icon: 'error',
              confirmButtonText: 'yes'
            })
          }
        }
       );
    }
 
  }
  goToSignup(){
    this.router.navigate(['joinus']); 
  }
  goToForgot(){
    this.router.navigate(['forgotPassword']);
  }

}
