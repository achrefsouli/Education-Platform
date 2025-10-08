import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courseUrl:string="https://education-platform-60q2.onrender.com/courses"
  constructor(private httpClient : HttpClient) { }
  addCourse(course:any){
   return this.httpClient.post<{ msg: string }>(this.courseUrl,course);
  }
  getAllCourses(){
    return this.httpClient.get<{tab:any}>(this.courseUrl);
  }
  getAllCoursesDurationCroissant(){
    return this.httpClient.get<{tab:any}>(this.courseUrl+"/sort/croissant");
  }
  getAllCoursesDurationDecroissant(){
    return this.httpClient.get<{tab:any}>(this.courseUrl+"/sort/decroissant");
  }
  getAllTeacherCourses(id:string){
    return this.httpClient.get<{tab:any}>(this.courseUrl+"/teacher/"+id);
  }
  getCourseById(id:string){
    return this.httpClient.get<{msg:string,user:any}>(this.courseUrl+"/"+id)
  }
  deleteCourse(id:string){
    return this.httpClient.delete<{msg:string}>(this.courseUrl+"/"+id);
  }
  updateCourse(course:any){
    return this.httpClient.put<{msg:string}>(this.courseUrl,course);
  }
}
