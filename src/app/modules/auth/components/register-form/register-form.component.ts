import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { CustomValidators } from '@utils/validators';

import {AuthService} from '@services/auth.service';
import {RequestStatus} from '@models/request-status.model'

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  formUser=this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]]
  })
  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [ CustomValidators.MatchValidator('password', 'confirmPassword') ]
  });
  status: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  showRegister=false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _auth:AuthService
  ) {}

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      this._auth.register(email, password,name).subscribe({
        next:()=>{
          this.status='success';
          this.router.navigate(['/login'])
        },
        error:(error)=>{
          this.status='failed';
          console.log(error )
        }
      })

    } else {
      this.form.markAllAsTouched();
    }
  }
  isAvailable(){
    debugger;
    if(this.formUser.valid){
      this.status='loading';

      const { email} = this.formUser.getRawValue();
      this._auth.isAvailable(email).subscribe({
        next:(res)=>{
          if(!res.isAvailable){
            this.status='success';
            this.router.navigate(['/login'],{
              queryParams:{email}
            })
          }else{
            this.status='success';
            this.showRegister=true;
            this.form.controls.email.setValue(email);
          }

        },
        error:(error)=>{
          this.status='failed';
          console.log(error )
        }
      })

    } else {
      this.formUser.markAllAsTouched();
    }
  }
}
