import { Component, OnInit } from '@angular/core';
import { Router}from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
    var checkLoginStatus = JSON.parse(localStorage.getItem('loginData'));
    console.log(checkLoginStatus);  
    if(typeof checkLoginStatus.email == 'undefined' && typeof checkLoginStatus.firstname == 'undefined'){
      this.router.navigate(['/']);
      return;
    }
  }

  // isLogin(){
  //   var checkLoginStatus = JSON.parse(localStorage.getItem('loginData'));
  //   //console.log(checkLoginStatus);
  //   if(checkLoginStatus.email){
  //     return true;
  //   }
  //   return false;
  // }
}
