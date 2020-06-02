import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, Validators,FormBuilder } from '@angular/forms';
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
      firstName : ['',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      lastName : ['',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      emailId : ['',[Validators.required,Validators.email]],
      address : ['',Validators.required],
      address2 : [''],
      mobileNumber : ['',[Validators.required,Validators.pattern("[0-9 ]{10}")]],
      city : ['',Validators.required],
      state : ['',Validators.required],
      zipcode : ['',[Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern("[0-9 ]{6}")]],
      password : ['',Validators.required],
      confirmPassword : ['', Validators.required],
    });
  }

 

  onSubmit(){
    alert('Clicked')
    console.log(this.registerForm.value)
    this.registerForm.reset();
  }

}
