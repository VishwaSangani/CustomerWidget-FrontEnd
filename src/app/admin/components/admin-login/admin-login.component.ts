import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  signInForm: FormGroup;
  constructor(private fb: FormBuilder, private _router: Router) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.email,]],
      password: ['', [Validators.minLength(8), Validators.maxLength(32),]]
    });
  }
  get email() {
    return this.signInForm.get('email');
  }
  get password() {
    return this.signInForm.get('password');
  }

  onSubmit() {
    console.log(this.signInForm.value);
  }
}
