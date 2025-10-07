import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {
  @Input() courseInput!:any;
  @Output() courseOutput:EventEmitter<any>=new EventEmitter();
  id!:any;
  user!:any;
  path!:string
  constructor(private router : Router,private activatedRoute : ActivatedRoute,private userService:UserService,private courseService : CourseService) { }

  ngOnInit(){
    let token:any=sessionStorage.getItem("token");
    if (token) {
      this.user=jwtDecode(token);
    }
   
  this.id=this.courseInput._id
  this.path=this.router.url
  console.log("here is pathh",this.path);
  
  }
  goToCourseDetail(){
this.router.navigate([`courseDetail/${this.id}`])
  }
  deleteCourse(id:string){
this.courseService.deleteCourse(id).subscribe(
  (response)=>{
    console.log("here is response from BE after deleting Course",response);
    if (response.msg=="success") {
      this.courseService.getAllCourses().subscribe(
        (data)=>{
          console.log("here is response from BE after getting all courses",data);
          this.courseOutput.emit(data.tab);
        }
      )
    }
  }
)
  }
}
