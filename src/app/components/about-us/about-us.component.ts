import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
courses!:number
students!:number
teachers!:number
  constructor(private userService : UserService,private courseService : CourseService) { }

  ngOnInit() {
    this.courseService.getAllCourses().subscribe(
      (data)=>{this.courses=data.tab.length}
    )
    this.userService.getAllStudents().subscribe(
      (data)=>{this.students=data.tab.length}
    )
    this.userService.getAllTeachers().subscribe(
      (data)=>{this.teachers=data.tab.length}
    )
  }

}
