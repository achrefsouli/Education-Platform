import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { response } from 'express';
import { jwtDecode } from "jwt-decode";
import { ContactService } from 'src/app/services/contact.service';
const Swal = require('sweetalert2')
@Component({
  selector: 'app-contaact-form',
  templateUrl: './contaact-form.component.html',
  styleUrls: ['./contaact-form.component.css']
})
export class ContaactFormComponent implements OnInit {
  contactForm!:FormGroup;
  message:any={}
  user!:any
  constructor(private contactService:ContactService) { }
  isLoggedIn():any{
    let token = sessionStorage.getItem("token");
    if (token) {
      this.user=jwtDecode(token);
    }
    return !!token;
  }
  ngOnInit(): void {
  }
  addContact(){
    console.log("here is message",this.message);
    if (!this.isLoggedIn()) {
      this.message.statut="not signed up"
      if (!this.message.name || !this.message.email || !this.message.subject || !this.message.message) {
        Swal.fire({
          title: 'Fill all form inputs"!',
          text: 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'yes'
        })
      } else {
        this.contactService.addContact(this.message).subscribe(
          (response)=>{
            console.log("here is response from BE after adding contact");
            if (response.msg=="contact added") {
              Swal.fire({
                title: "message sent!",
                icon: "success",
              });
              
            }
            else{
              Swal.fire({
                title: 'message not sent"!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'yes'
              })
            }
          }
        )
      }
     
    } else {
      this.message.statut="signed up"
      this.message.name=this.user.fName
      this.message.email=this.user.email
      if (!this.message.subject || !this.message.message) {
        Swal.fire({
          title: 'Fill all form inputs"!',
          text: 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'yes'
        })
      } else {
        this.contactService.addContact(this.message).subscribe(
          (response)=>{
            console.log("here is response from BE after adding contact");
            if (response.msg=="contact added") {
              Swal.fire({
                title: "message sent!",
                icon: "success",
              });
              
            }
            else{
              Swal.fire({
                title: 'message not sent"!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'yes'
              })
            }
          }
        ) 
      }
     
      
    }
  }

}
