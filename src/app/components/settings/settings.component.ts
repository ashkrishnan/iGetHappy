/*
  *Module Name    : Setting                              
  *Module Purpose : Setting  section of app
  *Created date   : July 2019
  *Created By     : Mandeep Singh
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../helper/must-match.validator';
import { CommonService } from '../../service/common.service';
import { ToastrService } from 'ngx-toastr'; 
import { Router}from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  checkSocialId:boolean=true;
  constructor(private formBuilder: FormBuilder,  private commonService: CommonService,private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      currentpassword: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
    });
    let data =<any>JSON.parse(localStorage.getItem('socialData'));
    
    if (data !=='null' && typeof data !== 'undefined'){
      console.log(data);
      this.checkSocialId=false;
    }else{
      this.checkSocialId=true;
    }
  }

  get f() { return this.registerForm.controls; }
  /*
    *Function name     : On Submit
    *Function Purpose  : This is use for submittion of form
    *Created date      : July 2019
    *Created By        : Mandeep Singh
  */
  onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        let data =<any>JSON.parse(localStorage.getItem('loginData'));
        let obj ={userId:data.id,current_password:this.registerForm.get('currentpassword').value,new_password:this.registerForm.get('password').value}

        this.commonService.changePassword(obj).subscribe(data => {
          if(data.status == 200){ 
            this.toastr.clear();
            this.toastr.success('Password updated');
            this.router.navigate(['/home']);
          }else{
            this.toastr.clear();
            this.toastr.error(data.message);
          }
        })
    }

}
