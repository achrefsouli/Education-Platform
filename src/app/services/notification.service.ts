import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notiUrl:string="https://education-platform-60q2.onrender.com/notifications"
  constructor(private httpClient : HttpClient) { }
  sendMessage(obj:any){
    return this.httpClient.post<{data:any}>(this.notiUrl,obj);
  }
}
