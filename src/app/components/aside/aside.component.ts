import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  frmSearch: FormGroup;

  constructor(private formbuilder: FormBuilder,
              private router: Router) { 

    this.buildFormSearch();
  }

  ngOnInit(): void {
  }

  buildFormSearch(){
    this.frmSearch = this.formbuilder.group({
      search: ['', Validators.required]
    });
    this.frmSearch.valueChanges
    .pipe(debounceTime(500))
    .subscribe(values =>{
      //console.log(values);
    });
  }

  onSubmit(event: Event){
    event.preventDefault();
    if (this.frmSearch.valid) {
      const values = this.frmSearch.value;
      console.log(values);
      this.frmSearch.reset();
      this.router.navigate(['search/', values.search]);
    }
  }

}
