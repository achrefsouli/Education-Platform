import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  photoUrl:string="https://education-platform-60q2.onrender.com/photos"
  constructor(private httpClient : HttpClient) { }

  getPhoto(teacher:string){
    return this.httpClient.post<{photo:any}>(this.photoUrl,teacher);
  }
}
