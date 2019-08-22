/*
  *Module Name    : Doctor Availability                               
  *Module Purpose : Shows the doctor avalibilty and about his details
  *Created date   : July 2019
  *Created By     : Mandeep Singh
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators, FormArray,FormControl } from '@angular/forms';
import { ElementRef, ViewChild} from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-doctor-availability',
  templateUrl: './doctor-availability.component.html',
  styleUrls: ['./doctor-availability.component.scss']
})
export class DoctorAvailabilityComponent implements OnInit {
  form: FormGroup;
  time_slot = [];
  timeSlot:string[]=[];
  toggleOptions: Array<String> = ["15 mins", "30 mins", "45 mins", "1 Hour" ,"2 Hour"];
  weekDays: Array<String> = ["Mon", "Tue", "Wed", "Thu" ,"Fri","Sat","Sun"];
  lastAction:any;
  days:string[]=[];
  items: number[] = [1,2];
  fromdate :string;
  productForm: FormGroup;
  name: string;
  to_from_time: AddToFromTime[];
  checkdays:boolean=false;
  checktimeslot:boolean=false;
  checktime:boolean=false;
  checkTimeData:boolean=false;
  checkTimeDataArr:any;
  checkCount:boolean[];

  @ViewChild('from_time', {static: false}) from_time: ElementRef;

  constructor(private formBuilder: FormBuilder, private profileService: ProfileService,private toastr: ToastrService) { 
    this.form = this.formBuilder.group({
      time_slot:['',Validators.required],
      days:['',Validators.required] ,
      to_from_time: this.formBuilder.array([this.formBuilder.group({ to: ['',Validators.required] ,from: ['',Validators.required]})])
    });
  }
  ngOnInit() {
   
  }
  /*
    *Function Name    : To From Time                              
    *Function Purpose : Managing the time avalibilty 
    *Created date     : July 2019
    *Created By       : Mandeep Singh
  */
  get toFromTime() {
    return this.form.get('to_from_time') as FormArray;
  }

 /*
    *Function Name    : Add More To From Fields                              
    *Function Purpose : Managing the form fields on adding time
    *Created date     : July 2019
    *Created By       : Mandeep Singh
  */
  addMoreToFromFields() {
    this.toFromTime.push(this.formBuilder.group({to: '' ,from: ''}));
    this.checktime = false;
  }
  /*
    *Function Name    : Delete More To From Fields                              
    *Function Purpose : This function is uses for deleting form fields
    *Created date     : July 2019
    *Created By       : Mandeep Singh
  */
  deleteMoreToFromFields(index) {
    this.toFromTime.removeAt(index);
  }

  
  /*
    *Function Name    : Selection Changed                              
    *Function Purpose : This function is uses for changed the slection of fields
    *Created date     : July 2019
    *Created By       : Mandeep Singh
  */
  selectionChanged(item) {
    this.timeSlot = item.value;
    this.checktimeslot= false;
    //console.log(this.timeSlot);
  }
  /*
    *Function name     : On change
    *Function Purpose  : The purpose of this functios is just handel the changing event of time slot
    *Created date      : July 2019
    *Created By        : Mandeep Singh
  */
  onChange(event, index, item) {
    if(this.days.indexOf(item) > -1){
      const index = this.days.indexOf(item, 0);
      if (index > -1) {
        this.days.splice(index, 1);
      }
    }else{
      this.days.push(item);
      this.checkdays= false;
    }
    //console.log(this.days);
  }

  /*
    *Function name     : Submit
    *Function Purpose  : Submistion of time slot as per date concern
    *Created date      : July 2019
    *Created By        : Mandeep Singh
  */
  submit(){
    this.checkTimeDataArr='';
    if(this.days.length === 0){
      this.checkdays= true;
      return;
    }
    if(this.timeSlot.length === 0){
      
      this.checktimeslot= true;
      return false;
    }
    if(this.form.get('to_from_time').value.length === 0){
      this.toastr.clear();
      this.toastr.error("Please add time slots");
      return false;
    }
    var flag=false;
    var timeflag=false;
    var count=0;
    var countArr=[];
    this.form.get('to_from_time').value.forEach(function (value) {
      if(value['to']==='' || value['from']===''){
        flag = true;
      }
      if(value['to'] <= value['from']){
        timeflag = true;
        countArr[count]=true;
        
        
      }else{
        //timeflag = false;
        countArr[count]=false;
      }
      count++;
    }); 
    //console.log(countArr);
    if(flag){
      this.checktime = true;
      //return;
    }else{
      this.checktime = false;
    }
    if(timeflag){
      this.checkTimeData = timeflag;
      this.checkTimeDataArr =countArr;
      // if(typeof this.checkCount[count] != 'undefined'){
      // this.checkCount[count]=true;
      // }
      // console.log( this.checkCount);
      //return;
    }
    
    let userData =<any>JSON.parse(localStorage.getItem('loginData')); 
    let data ={available_days:this.days, available_time:this.timeSlot,time_slot:this.form.get('to_from_time').value,userid:userData.id};
    if(!this.checktime && !timeflag){
      this.profileService.doctorAvailblity(data);
    }
  }

  // changeTime(time) {
  //   var hours = parseInt(time.substr(0, 2));
  //   if(time.indexOf('am') != -1 && hours == 12) {
  //       time = time.replace('12', '0');
  //   }
  //   if(time.indexOf('pm')  != -1 && hours < 12) {
  //       time = time.replace(hours, (hours + 12));
  //   }
  //   return time;
  // }
}

export class AddToFromTime {
  selling_point: string;
}
