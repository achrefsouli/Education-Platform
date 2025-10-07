import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent implements OnInit {
  book:any={}
  books:any=[];
  searchForm!:FormGroup;
  constructor(private bookService:BookService) { }

  ngOnInit(): void {
  }
  searchBook(){
    console.log("here is book",this.book);
    this.bookService.searchBook(this.book).subscribe(
    (result)=>{
      console.log("here is result from BE",result.data);
      this.books=result.data.docs
    }
    )
  }

}
