import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor( 
    private fb: FormBuilder,
    private router: Router
  
    ) { }

  ngOnInit(): void {
  }

  register(){
    console.log(this.myForm.value)
    this.router.navigateByUrl('/dashboard')
  }

}
