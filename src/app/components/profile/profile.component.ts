import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import * as path from 'path';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user!:any
imgPath!:any
  constructor(private router:Router,private userService :UserService) { }

  ngOnInit() {
    let token:any=sessionStorage.getItem("token");
    if (token) {
      this.user=jwtDecode(token);
    }
    this.userService.getUserById(this.user.id).subscribe(
      (data)=>{
        console.log("here is response from BE after geeting user",data.user);
        this.user=data.user
      }
    )
    console.log("here is user",this.user);
    
    
  }
  goToEdit(id:string){
    this.router.navigate([`editUser/${id}`])
  }

}
