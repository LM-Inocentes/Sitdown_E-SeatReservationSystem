import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  get form(): { [key: string]: AbstractControl; }
  {
    return this.loginForm.controls;
  }

  submittest(){
    this.isSubmitted = true;
    if(this.loginForm.invalid) return alert("invalid input");

    console.log(this.form['email'].value);
    console.log(this.form['password'].value);
  }
}