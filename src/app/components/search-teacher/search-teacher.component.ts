import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { log } from 'console';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-teacher',
  templateUrl: './search-teacher.component.html',
  styleUrls: ['./search-teacher.component.css']
})
export class SearchTeacherComponent implements OnInit {
  searchForm!: FormGroup
  search: any = {}
  teachers!:any;
  errorMsg!:string;
  constructor(private userService : UserService) { }

  ngOnInit(): void {
  }
  searchTeacher() {
    console.log(this.search.specialite);
    this.userService.getTeacherBySpecialite(this.search.specialite).subscribe(
      (data)=>{
        console.log("here is response from BE after searching Teacher",data);
        if (data.tab) {
          this.teachers=data.tab
        }
        
        
        
      }
    )
  }

}
