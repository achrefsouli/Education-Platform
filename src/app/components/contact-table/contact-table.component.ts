import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.css']
})
export class ContactTableComponent implements OnInit {
  contacts: any = []
  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getAllContacts().subscribe(
      (data) => {
        console.log("here is response from BE after getting contacts", data);
        this.contacts = data.tab

      }
    )
  }
  delete(id:string) {
   this.contactService.deleteContact(id).subscribe(
    (response)=>{
      console.log("here is response from BE after deleting contact",response);
      if (response.msg=="success") {
        this.contactService.getAllContacts().subscribe(
          (data) => {
            console.log("here is response from BE after getting contacts", data);
            this.contacts = data.tab
    
          }
        )
      } 
      
    }
   )
  }
}
