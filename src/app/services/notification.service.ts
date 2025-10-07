import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notiUrl:string="http://localhost:3000/notifications"
  constructor(private httpClient : HttpClient) { }
  sendMessage(obj:any){
    return this.httpClient.post<{data:any}>(this.notiUrl,obj);
  }
}
