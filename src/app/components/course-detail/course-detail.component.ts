import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
id!:any;
course:any={};
user:any={};
constructor(private activatedroute : ActivatedRoute,private courseService:CourseService,private userService : UserService) { }

  ngOnInit() {
    this.id=this.activatedroute.snapshot.paramMap.get('id');
    this.courseService.getCourseById(this.id).subscribe(
      (data)=>{
        console.log("here is response from BE after getting course",data);
        if (data.msg="success") {
          this.course=data.user;
        }
        
      }
    )
  
  }

}
