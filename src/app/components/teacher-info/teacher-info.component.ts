import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as bodyParser from 'body-parser';
import { PhotoService } from 'src/app/services/photo.service';
import { jwtDecode } from "jwt-decode";
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-teacher-info',
  templateUrl: './teacher-info.component.html',
  styleUrls: ['./teacher-info.component.css']
})
export class TeacherInfoComponent implements OnInit {
@Input() teacherInput!:any;
@Output() teacherOutput:EventEmitter<any>=new EventEmitter();
url!:any
user!:any
  constructor(private photoService : PhotoService,private userService :UserService) { }

  ngOnInit() {
    let token:any=sessionStorage.getItem("token");
    if (token) {
      this.user=jwtDecode(token);
    }
   
    console.log("here is tInput",this.teacherInput);
    this.photoService.getPhoto(this.teacherInput).subscribe(
      (apiresponse)=>{
        console.log("here is response from api",apiresponse);
        this.url=apiresponse.photo
      }
    )
    
  }
  deleteTeacher(id:string){
    this.userService.deleteUserById(id).subscribe(
      (response)=>{
        console.log("here is response from BE after deleting user",response);
        if (response.msg=="success") {
          this.userService.getAllTeachers().subscribe(
            (data)=>{
              console.log("here is response from BE after getting all users",data);
              this.teacherOutput.emit(data.tab);
            }
          )
        }
        
      }
    )
  }

}
