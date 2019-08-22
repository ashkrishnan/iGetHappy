import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { Router}from '@angular/router';
import { environment }from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import {  HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  countryCode:String;

  constructor(private http: HttpClient, private router: Router,private toastr: ToastrService) {

  }

  getLocation(){
    return this.http.get<any>('http://ip-api.com/json')
      .map(res => 
        { 
         // console.log(res.countryCode);
         // this.countryCode = res.countryCode;
        }
    );
  }

  changePassword(obj){
    return this.http.post<any>(environment.apiUrl+'users/changepassword', obj);
  }

  refreshToken(){

      let data =<any>JSON.parse(localStorage.getItem('loginData'));
      let obj ={user_id:data.id,}

      this.http.post(environment.apiUrl+'/auth/refreshToken', obj, {
        headers: new HttpHeaders().set('Authorization', 'Auth_Token')
        })
        .subscribe(
          result => {
            console.log(result);
          },
          err => {
            console.log("Error- something is wrong!")
      });
    }
  
  
}
