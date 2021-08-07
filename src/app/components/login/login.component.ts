import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {debounceTime} from 'rxjs/operators'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {
    this.buildFormLogin();
   }

  ngOnInit(): void {
  }

  private buildFormLogin(){
    this.formLogin = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.formLogin.valueChanges
    .pipe(debounceTime(500))
    .subscribe(value => {
      console.log(value)
    })
  }

  login(event: Event){
    event.preventDefault();
    if(this.formLogin.valid){
      const values = this.formLogin.value;
      console.log(values)
    };
  }

}
