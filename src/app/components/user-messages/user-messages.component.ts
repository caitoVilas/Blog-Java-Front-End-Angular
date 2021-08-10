import { Component, OnInit } from '@angular/core';
import { UserMessageResponse } from 'src/app/models/userMessageResponse';
import { UserMessagesService } from 'src/app/services/user-messages.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css'],
  providers: [UserMessagesService]
})
export class UserMessagesComponent implements OnInit {

  public messages: UserMessageResponse[];
  page: number = 0;
  isFirst: boolean;
  isLast: boolean;
  totalPages: number;
  pgs: number[] = [];
  actualPage: number;
 



  constructor(private userMessageService: UserMessagesService) { }

  ngOnInit(): void {

    this.getMessages(this.page);

    
  }

  getMessages(page: number) {
    this.pgs = [];
    this.userMessageService.viewAll(page).subscribe(
      res => {
       console.log(res)
       this.messages = res.content;
       this.isFirst = res.first;
       this.isLast = res.last;
       this.totalPages = res.totalPages;
       this.actualPage = res.number;
       for(let i = 0; i < this.totalPages; i++){
         this.pgs.push(i + 1);
       }
       console.log(this.pgs)
       console.log(this.actualPage)
      },
      err => {
        console.log(err)
      }
    );
  }

  deleteMessage(id: number){

    Swal.fire({
      title: `Eliminar Mensaje con id: ${id}`,
      text: 'Los mensajes eliminados No podran Recuperarse',
      icon: 'question',
      showCloseButton: false,
      showCancelButton: true,
      confirmButtonColor: 'green',
      confirmButtonText: `<i class="far fa-thumbs-up"></i>`,
      confirmButtonAriaLabel: 'ok',
      cancelButtonColor: 'red',
      cancelButtonText: `<i class="far fa-thumbs-down"></i>`,
      cancelButtonAriaLabel: 'no'
    }).then((result) => {
      if(result.isConfirmed){
        console.log('eliminar')
      }else{
        console.log('no eliminar')
      }
    });
  }

}
