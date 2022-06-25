import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

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
    private router: Router,
    private authService: AuthService
  
    ) { }

  ngOnInit(): void {
  }

  register(){
    const { name, email, password } = this.myForm.value;
    this.authService.register( name, email, password )
      .subscribe( ok  => {
        console.log( ok );
        if( ok === true ){
          this.router.navigateByUrl( '/dashboard');
        } else {
          Swal.fire('Error', ok, 'error');
        }
      })
  }

}
