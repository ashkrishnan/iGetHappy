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
export class SignUpService {

  constructor(private http: HttpClient, private router: Router,private toastr: ToastrService,private spinnerService: Ng4LoadingSpinnerService) { }

  signup(obj){
    var socialData ='null';
    localStorage.setItem('socialData',  JSON.stringify(socialData));
    this.spinnerService.show();
    this.http.post<any>(environment.apiUrl+'users/addwebuser', obj)
      .subscribe(res => 
        { this.spinnerService.hide();
          if(res.status == 200){
            this.toastr.clear();
            this.toastr.success('Signed up Successfully');
             var testObject ={email:res.data.email, firstname:res.data.first_name,lastname:res.data.last_name,id:res.data._id,name_prefix:res.data.name_prefix};
             localStorage.setItem('loginData',  JSON.stringify(testObject));
            this.router.navigate(['/upload-document']);
          }else{
            // Object.entries(res.data).forEach(
            //   ([key, value]) => {
            //     Object.entries(value).forEach(
            //       ([k, v]) => {
            //         if(k == 'message'){
            //           this.toastr.clear();
            //           this.toastr.error(v);
            //         }
            //       }
            //     );
            //   }
            // );
            this.toastr.clear();
            this.toastr.error(res.message);
          }
         
        }
    ); 
  }

  socialSignup(obj){
    this.spinnerService.show();
    this.http.post<any>(environment.apiUrl+'auth/socialLogin', obj)
      .subscribe(res => 
        { this.spinnerService.hide();
          if(res.status == 200){
            this.toastr.clear();
            this.toastr.success('Signed up Successfully');
             var testObject ={email:res.data.email, firstname:res.data.first_name,lastname:res.data.last_name,id:res.data._id,name_prefix:res.data.name_prefix};
             localStorage.setItem('loginData',  JSON.stringify(testObject));
            this.router.navigate(['/upload-document']);
          }else{
            this.toastr.clear();
            this.toastr.error(res.message);
          }
         
        }
    ); 
  }

  checkEmail(id){
    return this.http.get<any>(environment.apiUrl+'users/isEmailExists/'+id);
  }

  checkPhone(phone){
    return this.http.get<any>(environment.apiUrl+'users/isPhoneExists/'+phone);
  }
}
