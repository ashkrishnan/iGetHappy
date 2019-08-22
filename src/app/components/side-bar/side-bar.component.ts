/*
  *Module Name    : Side Bar                              
  *Module Purpose : Managing of side bar section
  *Created date   : July 2019
  *Created By     : Mandeep Singh
*/
import { Component, OnInit } from '@angular/core';
import { Router}from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  /*
    *Function name     : Is login
    *Function Purpose  : Managing login existence of user 
    *Created date      : July 2019
    *Created By        : Mandeep Singh
  */
  isLogin(){
    if(this.router.url === '/upload-document' ||  this.router.url ==="/forgot-password" || this.router.url === "/doctor-availability" || this.router.url === "/sign-up"|| this.router.url === "/sign-up" || this.router.url === "/social-sign-up"){
      return false;
    }
    var checkLoginStatus = JSON.parse(localStorage.getItem('loginData'));
    
    if(checkLoginStatus != null ){
      if(typeof checkLoginStatus.email != 'undefined' || typeof checkLoginStatus.firstname !== 'undefined'){
        return true;
      }
    }
      return false;
    
  }
}
