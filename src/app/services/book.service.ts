import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  bookUrl:string="https://education-platform-60q2.onrender.com/book"
  constructor(private httpClient:HttpClient) { }
  searchBook(obj:any){
    return this.httpClient.post<{data:any}>(this.bookUrl,obj);
  }
}
