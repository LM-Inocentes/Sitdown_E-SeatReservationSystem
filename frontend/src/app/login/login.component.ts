import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  isSubmitted = false;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
    //loginforms.controls.email
    //form.email

  get form()
  {
    return this.loginForm.controls;
  }

  submittest(){
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;


    console.log(this.form['email'].value);
    console.log(this.form['password'].value);
  }
}