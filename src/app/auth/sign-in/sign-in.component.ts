import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signinform:FormGroup
  constructor(private formbuilder : FormBuilder) { }
  hide =true

  ngOnInit(): void {
    this.signinform = this.formbuilder.group({
      userName:['',Validators.required],
      password:['',Validators.required]
    })
  }

}
