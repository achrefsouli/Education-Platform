import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
teachers:any=[];
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getAllTeachers().subscribe(
      (data)=>{
        console.log("here is response from BE after getting Teachers",data);
        this.teachers=data.tab;
        
      }
    )
  }
  updateTeachers(tab:any){
    this.teachers=tab;
  }

}
