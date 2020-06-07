import { ForgetPasswordService } from './../../shared/services/forget-password.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forgetPasswordform: FormGroup;
  constructor(private router: Router, private formbuilder: FormBuilder , private forgetPassword: ForgetPasswordService) { }

  ngOnInit(): void {
    this.forgetPasswordform = this.formbuilder.group({
      Email: ['', [ Validators.required , Validators.email]]
    });

  }

  onSubmit(form: FormGroup) {
  //alert('submit');
  console.log('Valid?', form.valid); // true or false
  if (form.valid === false) {
      alert('Please Enter Data');
    }
    else {
     // alert(window.location.origin + '/auth/resetPassword');
      // alert(this.forgetPasswordform.value.Email);
      //alert('Success now you can continue');
      localStorage.setItem('forgetpasswordEmail',this.forgetPasswordform.value.Email);
      this.forgetPassword.forgetPassword(this.forgetPasswordform.value.Email,
         window.location.origin + '/auth/resetPassword').subscribe(data=>{
        //console.log(data);
        //console.log(JSON.stringify(data));
        localStorage.setItem('resetcode',JSON.stringify(data));
        alert('Link for Reset Password send to your mail');
      },
      error=>{
          console.log('error:',JSON.stringify(error));
          alert('error');
      });
      
    }
  }


}
