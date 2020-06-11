import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ForgetPasswordService } from 'src/app/shared/services/forget-password.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordform: FormGroup;
  cnfhide = true;
  hide = true;
  email=null;
  resetcode: string =null;
  code=null;
  password=null;
  constructor(private router: Router, private formbuilder: FormBuilder,
              public activatedRoute: ActivatedRoute, private forgetPassword: ForgetPasswordService) { }

  ngOnInit(): void {
    this.resetPasswordform = this.formbuilder.group({
      password: ['', [Validators.required,Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: this.passwordMatch('password', 'confirmPassword')
    }
    );
    this.email=localStorage.getItem('forgetpasswordEmail');
    this.resetcode=localStorage.getItem('resetcode');
    this.code = (this.activatedRoute.snapshot.paramMap.get('code'));
    this.resetcode=this.resetcode.substring(1,this.resetcode.length-1);
    //console.log(localStorage.getItem('forgetpasswordEmail'));
    //console.log(this.resetcode);
    //console.log('url:',this.code);
    if(this.code===this.resetcode)
    {
      console.log('codematch');
    }
    else{
      console.log('invalid code');
      alert('Invalid link try again');
      this.router.navigate(['../forgetPassword']);
    }
  }

  passwordMatch(password: string, confirmPassword: string){
    return(formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];
      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  onSubmit(){
    //alert('submit');
    //console.log(this.resetPasswordform.controls.password.value);
    //console.log(this.resetPasswordform.value);
    const md5 = new Md5();
    var encPwd = md5.appendAsciiStr(this.resetPasswordform.controls.password.value).end();
    this.password = encPwd.toString();
    //console.log(encPwd);
    //console.log(this.email);
    this.forgetPassword.resetPassword(this.email,this.password).subscribe(data=>{
      //console.log(data);
      localStorage.setItem('forgetpasswordEmail','');
      localStorage.setItem('resetcode','');
      this.router.navigate(['../signin']);
      alert(data);
    },
    error=>{
      console.log('Error:',JSON.stringify(error));
      alert('Error');
    });
  }


}
