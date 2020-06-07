import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'signin',
    component: SignInComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgetPassword',
    component: ForgetPasswordComponent
  },
  {
    path: 'resetPassword/:code',
    component: ResetPasswordComponent
  },
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
