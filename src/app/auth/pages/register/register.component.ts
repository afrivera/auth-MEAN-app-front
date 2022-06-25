import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    name: ['andres', [ Validators.required ]],
    email   : ['andres@gmail.com', [ Validators.required, Validators.email ]],
    password: ['123456',[ Validators.required, Validators.minLength(6)]],
  })

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  register(){
    console.log(this.myForm.value)
    console.log(this.myForm.valid)
  }

}
