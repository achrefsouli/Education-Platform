import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
contactUrl:string="https://education-platform-60q2.onrender.com/contact"
  constructor(private httpClient : HttpClient) { }
  addContact(contact:any){
    return this.httpClient.post<{msg:string}>(this.contactUrl,contact)
  }
  getAllContacts(){
    return this.httpClient.get<{tab:any}>(this.contactUrl);
  }
  deleteContact(id:string){
    return this.httpClient.delete<{msg:string}>(this.contactUrl+"/"+id);
  }
}
