import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.css']
})
export class JoinUsComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  joinAsStudent(){
  this.router.navigate(['signup']);
  }
  joinAsTeacher(){
    this.router.navigate(['signupTeacher']);
    }
    joinAsParent(){
      this.router.navigate(['signupParent']);
      }
}
