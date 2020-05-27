import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName : ['',Validators.required],
      // 'lastName' : ['',Validators.required],
      // 'emailId' : ['',[Validators.required,Validators.email]],
      // 'address' : ['',Validators.required],
      // 'address2' : ['',Validators.required],
      // 'mobileNumber' : ['',Validators.required],
      // 'city' : ['',Validators.required],
      // 'state' : ['',Validators.required],
      // 'zipcode' : ['',[Validators.required, Validators.minLength(6)]],
      // 'password' : ['',Validators.required]
    });
  }

  onSubmit(){
alert('Clicked')
console.log(this.registerForm.value)
  }

}
