import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { NewUser } from 'src/app/models/newUser';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;
  newUser: NewUser;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
    this.buildFormRegister();
   }

  ngOnInit(): void {
  }

  buildFormRegister(){
    this.formRegister = this.formBuilder.group({
      name: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.formRegister.valueChanges
    .pipe(debounceTime(500))
    .subscribe(value => {
      //console.log(value)
    });
  }

  register(event: Event){
    event.preventDefault();
    if(this.formRegister.valid){
      const roles: string = 'user';
      const values = this.formRegister.value;
      this.newUser = new NewUser(values.name, values.userName, values.email, values.password ,roles);
      
      this.userService.register(this.newUser).subscribe(
        res => {
          Swal.fire({
            icon: 'success',
            title: 'Usuario guardado !!',
            showConfirmButton: false,
            timer: 3000
          });
          window.location.href="/login";
        },
        err => {
         Swal.fire({
           icon: 'error',
           title: 'Error al crear Usuario',
           text: err.error.message,
           showConfirmButton: false,
           timer: 3000
         })
        }
      );
    }
  }

}
