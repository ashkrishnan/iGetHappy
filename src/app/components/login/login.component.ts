/*
  *Module Name    : Login                                
  *Module Purpose : For user sign-in
  *Created date   : July 2019
  *Created By     : Mandeep Singh
*/
import { Component, OnInit } from '@angular/core';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { ModalComponent } from '../../modal/modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, public dialog: MatDialog, private toastr: ToastrService, private authService: AuthService) {
    this.createForm();
  }
  referral: string = '';
  termCondition: boolean = true;
  private user: SocialUser;
  private loggedIn: boolean;
  rememberMe: string = "true";
  userEmail: string = '';
  terms_condition: any;
  ngOnInit() {

    var emptyData = [];
    var checkLoginStatus = JSON.parse(localStorage.getItem('loginData'));
    if (checkLoginStatus != null) {
      if (checkLoginStatus != '' && typeof checkLoginStatus.email != 'undefined' && checkLoginStatus.email != null && checkLoginStatus.firstname != null && typeof checkLoginStatus.auth_token != 'undefined') {
        this.toastr.clear();
        this.toastr.info('Please logout first.');
        this.router.navigate(['/home']);
        return;
      }
    }
    localStorage.setItem('loginData', JSON.stringify(emptyData));

    this.authService.authState.subscribe((user) => {
      this.user = user;
    });

  }
  /*
   *Function name     : Create Form
   *Function Purpose  : Managing validation control on submition 
   *Created date      : July 2019
   *Created By        : Mandeep Singh
  */
  createForm() {
    var userdata = JSON.parse(localStorage.getItem('rememeberData'));
    //console.log(userdata);
    if (userdata !== null && typeof userdata.email !== 'undefined' && typeof userdata.remmberMe !== null && userdata.remmberMe === 'true') {
      this.userEmail = userdata.email;
    }
    this.angForm = this.fb.group({
      email: [this.userEmail, [Validators.required, Validators.email, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]],
      password: ['', Validators.required],
    });
  }

  /*
    *Function name     : Login
    *Function Purpose  : Managing login service api  control on form submition 
    *Created date      : July 2019
    *Created By        : Mandeep Singh
  */
  login(email, password) {
    if (this.angForm.invalid) {
      return;
    }
    var rememeberData = { remmberMe: this.rememberMe, email: email };
    localStorage.setItem('rememeberData', JSON.stringify(rememeberData));
    if (this.termCondition) {
      this.loginService.login(email, password, this.referral);
    } else {
      this.toastr.clear();
      this.toastr.error('Please select Term and Conditions.');
    }
  }

  /*
    *Function name     : Open Dialog
    *Function Purpose  : Managing login service api responce after form submition 
    *Created date      : July 2019
    *Created By        : Mandeep Singh
  */
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: { referral: this.referral }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.referral = result;
    });
  }
  /*
   *Function name     : Check Term & Condition
   *Function Purpose  : Managing check's of term condition
   *Created date      : July 2019
   *Created By        : Mandeep Singh
 */
  checkTermCondition(i, e) {
    if (e.checked) {
      this.termCondition = true;
    } else {
      this.termCondition = false;
    }
  }
  /*
    *Function name     : Sign With Google
    *Function Purpose  : The function use's for sign in with google 
    *Created date      : July 2019
    *Created By        : Mandeep Singh
  */
  signInWithGoogle(): void {
    console.log(this.terms_condition);
    if (!this.terms_condition) {
      this.toastr.clear();
      this.toastr.error('Please select Terms and Conditions');
      return;
    }
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
      // console.log(res);
      var testObject = { email: res.email, firstname: res.firstName, lastname: res.lastName, loginType: res.provider, socialId: res.id };
      localStorage.setItem('loginData', JSON.stringify(testObject));
      this.loginService.checkSocialLoginStatus(res.id);
    });
  }

  /*
   *Function name     : Sign With Facebook
   *Function Purpose  : The function use's for sign in with facebbok 
   *Created date      : July 2019
   *Created By        : Mandeep Singh
 */
  signInWithFB(): void {
    console.log(this.terms_condition);
    if (!this.terms_condition) {
      this.toastr.clear();
      this.toastr.error('Please select Terms and Conditions');
      return;
    }
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(res => {
      var testObject = { email: res.email, firstname: res.firstName, lastname: res.lastName, loginType: res.provider, socialId: res.id };
      localStorage.setItem('loginData', JSON.stringify(testObject));
      this.loginService.checkSocialLoginStatus(res.id);
    });
  }
  /*
    *Function name     : Sign Out
    *Function Purpose  : Clear browser cache with auth-service & sign-out from app 
    *Created date      : July 2019
    *Created By        : Mandeep Singh
  */
  signOut(): void {
    this.authService.signOut();
  }
  /*
      *Function name     : On change
      *Function Purpose  : The purpose of this functios is just handel the changing event of remeber me
      *Created date      : July 2019
      *Created By        : Mandeep Singh
  */
  onChange(event) {
    if (event.checked) {
      this.rememberMe = "true";
    } else {
      this.rememberMe = "false";
    }
    console.log(this.rememberMe);
  }
  /*
    *Function name     : On change term condition
    *Function Purpose  : The purpose of this functios is just handel the changing event of term and condition
    *Created date      : July 2019
    *Created By        : Mandeep Singh
  */
  onChangeTermCondition(event) {
    if (event.checked) {
      this.terms_condition = true;
    } else {
      this.terms_condition = false;
    }
  }

}
