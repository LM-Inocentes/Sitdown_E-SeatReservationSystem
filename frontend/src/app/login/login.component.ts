import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  isSubmitted = false;
  returnUrl = '/customer-event-list';

  constructor(private formBuilder:FormBuilder, private userService:UserService, 
    private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl; //?returnUrl=/checkout
  }
    //loginforms.controls.email
    //form.email

  get form()
  {
    return this.loginForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;

    console.log(this.form['email'].value);
    console.log(this.form['password'].value);

    this.userService.login({
      email: this.form.email.value,
      password: this.form.password.value
    }).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}