/*
  *Module Name    : Header                              
  *Module Purpose : Managing header section of app
  *Created date   : July 2019
  *Created By     : Mandeep Singh
*/
import { Component, OnInit } from '@angular/core';
import { Router}from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }
  firstname:string;
  name_prefix:string="Dr";

  ngOnInit() {
    var checkLoginStatus = JSON.parse(localStorage.getItem('loginData'));
    if(checkLoginStatus === null){
      this.router.navigate(['/']);
    }
    //console.log(localStorage.getItem('rememeberData'));
  }

 /*
   *Function name     : Is login
   *Function Purpose  : Managing login existence of user 
   *Created date      : July 2019
   *Created By        : Mandeep Singh
  */

  isLogin(){
    if(this.router.url === '/upload-document' ||  this.router.url ==="/forgot-password" || this.router.url === "/doctor-availability" || this.router.url === "/sign-up" || this.router.url === "/social-sign-up"){
      return false;
    }
    var checkLoginStatus = JSON.parse(localStorage.getItem('loginData'));
    if(checkLoginStatus != null ){
      if(typeof checkLoginStatus.email != 'undefined' || typeof checkLoginStatus.firstname !== 'undefined'){
        this.firstname = checkLoginStatus.firstname;
        // this.name_prefix= checkLoginStatus.name_prefix;
        return true;
      }
    }
    return false;
  }
   /*
    *Function name     : Log Out
    *Function Purpose  : Clear browser cache with auth-service & log-out from app 
    *Created date      : July 2019
    *Created By        : Mandeep Singh
  */
  logout(){
    var emptyData =[];
    localStorage.setItem('loginData',  JSON.stringify(emptyData));
    this.router.navigate(['/']);
  }

}
