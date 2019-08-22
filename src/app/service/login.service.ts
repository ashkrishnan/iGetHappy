import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router}from '@angular/router';
import { environment }from '../../environments/environment';
import { ToastrService } from 'ngx-toastr'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router,private toastr: ToastrService,private spinnerService: Ng4LoadingSpinnerService) { }
  

  login(email, password,referral) {
    var socialData ='null';
    localStorage.setItem('socialData',  JSON.stringify(socialData));
    const obj = {
      email,
      password,
      referral
    };
    this.spinnerService.show();
    this.http.post<any>(environment.apiUrl+'auth/login', obj)
      .subscribe(res => 
        {this.spinnerService.hide();
          if(res.status == 200){
            this.toastr.clear();
            this.toastr.success('Logged in Successfully');
            var testObject ={email:res.data.email, firstname:res.data.first_name,lastname:res.data.last_name,auth_token:res.token,id:res.data._id,name_prefix:res.data.name_prefix};
            localStorage.setItem('loginData',  JSON.stringify(testObject));
            
            this.router.navigate(['/home']);
          }else{
            if(res.data != null){
              res.data.forEach(([key, value]) => {
                  value.forEach(([k, v]) => {
                      if(k == 'message'){
                        this.toastr.error(v);
                      }
                    }
                  );
                }
              );
            }else{
              this.toastr.clear();
              this.toastr.error('Enter a valid registered email address and password');
            }
          }
         
        }
    );  
  }

  forgotPassword(email, phone_number) {
    this.spinnerService.show();
    let obj={};
    if(email!=''){
       obj = {
        email:email
      };
    }else{
      obj = {
        phone:phone_number
      };
    }
    this.http.post<any>(environment.apiUrl+'auth/forgotPassword', obj)
      .subscribe(res => 
        { this.spinnerService.hide();
          if(res.status == 200){
            this.toastr.clear();
            var testObject ='';
            localStorage.setItem('loginData',  JSON.stringify(testObject));
            this.toastr.success(res.message);
            this.router.navigate(['/login']);
          }else{
            this.toastr.clear();
            if(email != ""){
              this.toastr.error('Email Id does not exist');
            }
            if(phone_number.length >3){
              this.toastr.error('Phone number does not exist on Twilio');
            }
          }
         
        }
    );  
  }

  checkSocialLoginStatus(social_id){
    var socialData ='null';
    localStorage.setItem('socialData',  JSON.stringify(socialData));
    this.spinnerService.show();
    this.http.get<any>(environment.apiUrl+'users/isSocialIdExists/'+social_id)
      .subscribe(res => 
        { 
          this.spinnerService.hide();
          if(res.data.exists === 0){
            this.router.navigate(['/social-sign-up'], { state: { data: social_id } });
          }else{
            this.toastr.success('Logged in Successfully');
            var testObject ={
              email:(typeof res.data.user.email !== 'undefined')?res.data.user.email:'null',
              social_id:res.data.user.social_id, 
              firstname:res.data.user.first_name,
              lastname:res.data.user.last_name,
              //auth_token:res.token,
              id:res.data.user._id,
              name_prefix:(typeof res.data.user.name_prefix !== 'undefined')?res.data.user.name_prefix:'Dr',
            };
            localStorage.setItem('loginData',  JSON.stringify(testObject));
            var socialData =res.data.user.social_id;
            localStorage.setItem('socialData',  JSON.stringify(socialData));
            this.router.navigate(['/home']);
          }
        }
    ); 
  }


   getAllLanguage(countrycode): Observable<any> { 
    return this.http.get<any>(environment.apiUrl+'countries/getByCountryCode/'+countrycode)
  }
}
