import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { NewUserMessage } from 'src/app/models/newUserMessage';
import { UserMessagesService } from 'src/app/services/user-messages.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  formUserMessage: FormGroup;
  newUserMessage: NewUserMessage;


  constructor(private formBuilder: FormBuilder,
              private userMessageService: UserMessagesService) {
    this.builFormUserMessage();
  }

  ngOnInit(): void {
  }

  builFormUserMessage(){
    this.formUserMessage = this.formBuilder.group({
        email: ['', Validators.required],
        message: ['', Validators.required]
    });
    this.formUserMessage.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        //console.log(value)
      })
  }

  sendMessage(event: Event){
    event.preventDefault();
    if(this.formUserMessage.valid){
      const values = this.formUserMessage.value;
      this.newUserMessage = new NewUserMessage(values.email, values.message);
    
      this.userMessageService.sendMessage(this.newUserMessage).subscribe(
        res => {
            Swal.fire({
              icon: 'success',
              title: 'Mensaje Enviado !!',
              showConfirmButton: false,
              timer: 3000
            });
            this.builFormUserMessage();
        },
        err => {
           Swal.fire({
             icon: 'error',
             title: 'Error al enviar el Mensaje',
             text: 'Intente mas tarde',
             showConfirmButton: false,
             timer: 3000
           });
        },
      );
      
    }
  };

  handleCancel() {
    this.builFormUserMessage();
  }

}
