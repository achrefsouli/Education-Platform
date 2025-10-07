import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { log } from 'console';
import { jwtDecode } from "jwt-decode";
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
const Swal = require('sweetalert2')
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm!:FormGroup;
  constructor(private formBuilder : FormBuilder,private userService:UserService,private activatedRoute : ActivatedRoute,private router : Router) { }
user!:any
  ngOnInit(){
    this.resetForm=this.formBuilder.group({
      password:['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/)]]
    })
    let token:any=this.activatedRoute.snapshot.paramMap.get("token");
    this.user = jwtDecode(token);
    

  }
  reset(){
    let userToUpdate ={
      password:this.resetForm.value.password,
      id:this.user.id,
    }
    console.log("here is new pass",this.resetForm.value.password);
    this.userService.updatePassword(userToUpdate).subscribe(
      (response)=>{
        if (response.msg=="success") {
          this.router.navigate(['login']);
        }
        else{
          Swal.fire({
            title: 'Error"!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'yes'
          })
        }
      }
    )
  }
}
