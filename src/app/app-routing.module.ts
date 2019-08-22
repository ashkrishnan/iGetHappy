import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TermConditionComponent } from './components/term-condition/term-condition.component';
import { DoctorAvailabilityComponent } from './components/doctor-availability/doctor-availability.component';
import { UploadDocumentsComponent } from './components/upload-documents/upload-documents.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SocialSignupComponent } from './components/social-signup/social-signup.component';

const routes: Routes = [{
  path: '',
  component: LoginComponent,
},{
  path: 'home',
  component: HomeComponent,
  children: [
    { path: '', component: HomeComponent },
  ]
},
{
  path: 'profile',
  component: ProfileComponent,
  children: [
    { path: '', component: ProfileComponent },
  ]
},
{
  path: 'doctor-availability',
  component: DoctorAvailabilityComponent,
  children: [
    { path: '', component: DoctorAvailabilityComponent },
  ]
},
{
  path: 'login',
  component: LoginComponent,
  children: [
    { path: '', component: LoginComponent },
  ]
},{
  path: 'forgot-password',
  component: ForgetPasswordComponent,
  children: [
    { path: '', component: ForgetPasswordComponent },
  ]
},{
  path: 'sign-up',
  component: SignUpComponent,
  children: [
    { path: '', component: SignUpComponent },
  ]
}
,{
  path: 'terms-condition',
  component: TermConditionComponent,
  children: [
    { path: '', component: TermConditionComponent },
  ]
}
,{
  path: 'upload-document',
  component: UploadDocumentsComponent,
  children: [
    { path: '', component: UploadDocumentsComponent },
  ]
},{
  path: 'settings',
  component: SettingsComponent,
  children: [
    { path: '', component: SettingsComponent },
  ]
},{
  path: 'social-sign-up',
  component: SocialSignupComponent,
  children: [
    { path: '', component: SocialSignupComponent },
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
