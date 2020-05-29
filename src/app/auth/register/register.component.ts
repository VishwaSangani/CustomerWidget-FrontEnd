import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { states } from '../../../environments/variables'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  states: string[] 
  hide = true
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.states = states;
    this.registerForm = this.formBuilder.group({
      firstName : ['',Validators.required],
      lastName : ['',Validators.required],
      emailId : ['',[Validators.required,Validators.email]],
      address : ['',Validators.required],
      address2 : [''],
      mobileNumber : ['',Validators.required],
      city : ['',Validators.required],
      state : ['',Validators.required],
      zipcode : ['',[Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      password : ['',Validators.required]
    });
  }

  onSubmit(){
    alert('Clicked')
    console.log(this.registerForm.value)
    this.registerForm.reset();
  }

}
