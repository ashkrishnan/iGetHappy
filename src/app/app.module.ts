import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BlockTitleComponent } from './components/block-title/block-title.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule,MatFormFieldModule,MatInputModule,MatRippleModule,MatDialogModule,MatGridListModule,MatSelectModule} from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ModalComponent } from './modal/modal.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatChipsModule} from '@angular/material/chips';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TermConditionComponent } from './components/term-condition/term-condition.component';
import { MatTabsModule, MatStepperModule, MatAutocompleteModule, MatRadioModule } from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { DoctorAvailabilityComponent } from './components/doctor-availability/doctor-availability.component';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { TimePickerComponent } from './components/timepicker/timepicker.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { environment }from '../environments/environment';

//services

import { LoginService } from './service/login.service';
import { CommonService } from './service/common.service';
import { SignUpService } from './service/sign-up.service';
import { UploadDocumentsComponent } from './components/upload-documents/upload-documents.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SettingsComponent } from './components/settings/settings.component';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import { SocialSignupComponent } from './components/social-signup/social-signup.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("150300780472-iqiojilkf8v11eh4t61omvdlioug8djr.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("2269825929800069")
  }
]);

// @Injectable()

// export class MyInterceptor implements HttpInterceptor {
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     console.log(req.url);
//     var urlArr=[
//       'https://pro.ip-api.com/json/?fields=16510975&key=test-demo-pro',
//       environment.apiUrl+'auth/addwebuser',
//       environment.apiUrl+'auth/login',
//       environment.apiUrl+'users/isEmailExists/<any>',
//       environment.apiUrl+'users/isPhoneExists/<any>',
//     ];
//     if(!(urlArr.includes(req.url))){
//      console.log("here");
//       let data =<any>JSON.parse(localStorage.getItem('loginData'));
//       const reqHeader = req.clone({headers: req.headers.set('Authorization', data.auth_token)});
//       return next.handle(reqHeader);
//     }else{
//       console.log("here1");
//       const reqHeader = req.clone({ headers: req.headers.delete('Content-Type','application/json') });
//       return next.handle(reqHeader);
//     }

   
//   }
// }

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    BlockTitleComponent,
    ModalComponent,
    ForgetPasswordComponent,
    SignUpComponent,
    TermConditionComponent,
    DoctorAvailabilityComponent,
    UploadDocumentsComponent,
    SideBarComponent,
    SettingsComponent,
    TimePickerComponent,
    SocialSignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDialogModule,
    MatGridListModule,
    MatSelectModule,
    MatSliderModule,
    MatChipsModule,
    MatTabsModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatCardModule,
    MatIconModule,
    SocialLoginModule,
    MatMenuModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    NgxMaterialTimepickerModule,
    MatRadioModule,
    MatDatepickerModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    ModalComponent
  ],
  providers: [LoginService,SignUpService,CommonService,{
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }, 
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: MyInterceptor,
  //   multi: true,
  // },
],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent],
})
export class AppModule { }
