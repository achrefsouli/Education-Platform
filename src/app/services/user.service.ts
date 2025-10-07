import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from 'express';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string = "http://localhost:3000/users"
  constructor(private httpClient: HttpClient) { }
  signup(user: any, photo: File) {

    let fData = new FormData;
    photo && fData.append("photo", photo);
    fData.append("fName", user.fName);
    fData.append("lName", user.lName);
    user.adresse && fData.append("adresse", user.adresse);
    fData.append("tel", user.tel);
    fData.append("email", user.email);
    fData.append("password", user.password);
    fData.append("role", user.role);
    user.specialite && fData.append("specialite", user.specialite);
    user.statut && fData.append("statut", user.statut);
    user.telChild && fData.append("telChild", user.telChild);
    user.motherName && fData.append("motherName", user.motherName);
    user.fatherName && fData.append("fatherName", user.fatherName);





    return this.httpClient.post<{ msg: string }>(this.userUrl + "/signup", fData);
  }
  login(user: any) {
    return this.httpClient.post<{ msg: string, user: string }>(this.userUrl + "/login", user)
  }
  getAllUsers() {
    return this.httpClient.get<{ tab: any }>(this.userUrl);
  }
  getAllTeachers() {
    return this.httpClient.get<{ tab: any }>(this.userUrl + "/teachers");
  }
  getAllStudents() {
    return this.httpClient.get<{ tab: any }>(this.userUrl + "/students");
  }
  getAllParents() {
    return this.httpClient.get<{ tab: any }>(this.userUrl + "/parents");
  }
  deleteUserById(id: string) {
    return this.httpClient.delete<{ msg: string }>(this.userUrl + "/" + id);
  }
  updateStatut(user: any) {
    return this.httpClient.put<{ msg: string }>(this.userUrl, user);
  }
  affectCourse(user: any) {
    return this.httpClient.put<{ msg: string }>(this.userUrl + "/affectCourse", user);
  }
  getUserById(id: string) {
    return this.httpClient.get<{ user: any }>(this.userUrl + "/" + id);
  }
  updateUserById(user: any, photo: File) {
    let fData = new FormData;
    photo && fData.append("photo", photo);
    fData.append("fName", user.fName);
    fData.append("lName", user.lName);
    user.adresse && fData.append("adresse", user.adresse);
    fData.append("tel", user.tel);
    fData.append("email", user.email);
    fData.append("password", user.password);
    fData.append("role", user.role);
    user.specialite && fData.append("specialite", user.specialite);
    user.statut && fData.append("statut", user.statut);
    user.telChild && fData.append("telChild", user.telChild);
    user.motherName && fData.append("motherName", user.motherName);
    user.fatherName && fData.append("fatherName", user.fatherName);
    fData.append("_id", user._id)
    user.courseId && fData.append("courseId", user.courseId);


    return this.httpClient.put<{ msg: string }>(this.userUrl + "/update", fData);
  }
  getUserByTel(tel: number) {
    return this.httpClient.get<{ user: any,msg:string }>(this.userUrl + "/search/" + tel);
  }
  getTeacherBySpecialite(specialite:string){
    return this.httpClient.get<{tab:any,msg:string}>(this.userUrl+"/searchTeacher/"+specialite);
  }
  resetPassword(email:string){
   return this.httpClient.get<{msg:string}>(this.userUrl+"/forgotPassword/"+email);
  }
  updatePassword(user:any){
    return this.httpClient.put<{msg:string}>(this.userUrl+"/resetPassword",user);
   }

}
