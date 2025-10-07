import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})
export class InstructorsComponent implements OnInit {
teachers:any=[]
  constructor(private userService : UserService) { }

  ngOnInit() {
    this.userService.getAllTeachers().subscribe(
      (data)=>{
        console.log("here is response from BE after getting Teachers",data);
        this.teachers=data.tab;
        
      }
    )
  }

  

}
