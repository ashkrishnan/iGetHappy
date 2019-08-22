import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router}from '@angular/router';
import { environment }from '../../environments/environment';
import { ToastrService } from 'ngx-toastr'; 
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private router: Router,private toastr: ToastrService,private spinnerService: Ng4LoadingSpinnerService) { }

  getProfile(id){
    return this.http.get<any>(environment.apiUrl+'users/'+id);
  }
  updateUser(id,obj){
    this.spinnerService.show();
    this.http.patch<any>(environment.apiUrl+'users/'+id, obj)
      .subscribe(res => 
        { 
          this.spinnerService.hide();
          if(res.status == 200){
            var testObject ={email:res.data.email, firstname:res.data.first_name,lastname:res.data.last_name,auth_token:res.token,id:res.data._id};
            localStorage.setItem('loginData',  JSON.stringify(testObject));
            this.toastr.clear();
            this.toastr.success('Updated Successful');
            this.router.navigate(['/home']);
          }else{
            Object.entries(res.data).forEach(
              ([key, value]) => {
                Object.entries(value).forEach(
                  ([k, v]) => {
                    if(k == 'message'){
                      this.toastr.clear();
                      this.toastr.error(v);
                    }
                  }
                );
              }
            );
          }
         
        }
    ); 
  }

  uploadDocuments(obj){
    this.spinnerService.show();
    this.http.post<any>(environment.apiUrl+'documents', obj)
      .subscribe(res => 
        { this.spinnerService.hide();
          if(res.status == 200){
            this.toastr.success('Documents uploaded successfully');
            this.router.navigate(['/doctor-availability']);
          }else{
            Object.entries(res.data).forEach(
              ([key, value]) => {
                Object.entries(value).forEach(
                  ([k, v]) => {
                    if(k == 'message'){
                      this.toastr.error(v);
                    }
                  }
                );
              }
            );
          }
        }
    ); 
  }


  doctorAvailblity(data){
    this.spinnerService.show();
    this.http.post<any>(environment.apiUrl+'users/doctoravailability', data)
      .subscribe(res => 
        { this.spinnerService.hide();
          if(res.status == 200){
            this.toastr.clear();
            this.toastr.success(res.message);
            this.router.navigate(['/home']);
          }else{
            this.toastr.clear();
            this.toastr.error(res.message);
          }
        }
    );

  }

}
