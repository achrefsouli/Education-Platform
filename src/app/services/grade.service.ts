import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  gradeUrl: string = "https://education-platform-60q2.onrender.com/grades"
  constructor(private httpClient: HttpClient) { }
  addGrade(grade: any) {
    return this.httpClient.post<{ msg: string }>(this.gradeUrl, grade);
  }
  getGradeByStudentId(id: string) {
    return this.httpClient.get<{msg:string,tab:any}>(this.gradeUrl+"/student/"+id);
  }
  getGradeByTeacherId(id: string) {
    return this.httpClient.get<{msg:string,tab:any}>(this.gradeUrl+"/teacher/"+id);
  }
  getGradeById(id: string) {
    return this.httpClient.get<{msg:string,grade:any}>(this.gradeUrl+"/"+id);
  }
  getAllGrades(){
    return this.httpClient.get<{tab:any}>(this.gradeUrl);
  }
  getAllGradesDesc(){
    return this.httpClient.get<{tab:any}>(this.gradeUrl+"/sort/decroissant");
  }
  getAllGradesCroissant(){
    return this.httpClient.get<{tab:any}>(this.gradeUrl+"/sort/croissant");
  }
  deleteGradeById(id:string){
    return this.httpClient.delete<{msg:string}>(this.gradeUrl+"/"+id)
  }
 updateGrade(newGrade:any){
    return this.httpClient.put<{msg:string}>(this.gradeUrl,newGrade)
  }
}
