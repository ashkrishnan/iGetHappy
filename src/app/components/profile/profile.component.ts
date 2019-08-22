/*
  *Module Name    : Profile                              
  *Module Purpose : Managing profile section of app
  *Created date   : July 2019
  *Created By     : Mandeep Singh
*/
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {ElementRef , ViewChild} from '@angular/core';
import { LoginService } from '../../service/login.service';
import { CommonService } from '../../service/common.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr'; 
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  image:any;
  firstName:string='';
  lastName:string='';
  profession:string='';
  language:string[]=[];
  speciality:string='';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  langCtrl = new FormControl();
  allLanguage: string[]=[];
  langError : boolean =false;
  selectable = true;
  removable = true;
  addOnBlur = true;
  registerForm: FormGroup;
  selectedFile: File;
  public imagePath;
  imgURL: any ;
  public message: string;
  files = [];
  medical_proof: string;
  degree_proof:any;
  government_proof: string;
  specialization: string[] = ['TEST','MBBS', 'MD', 'BDS', 'OTHER'];
  professions: string[] = ['SURGEON','TEST','OTHER'];
  medical_proof_link:string;
  sliderValue :any;
  imageError:boolean=false;
  medical_proof_error:boolean=false;
  degree_proof_error:boolean=false;
  government_proof_error:boolean=false;
  name_prefix:string;
  urls = [];
  filteredFruits: Observable<string[]>;
  fileFormats:string[]=['image/gif','application/msword','image/jpeg','image/bmp','image/png','application/pdf','image/svg+xml','image/tiff','application/vnd.oasis.opendocument.spreadsheet','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.oasis.opendocument.text','application/rtf'];

  @ViewChild('fruitInput', {static: false}) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  @ViewChild('chipList', {static: false}) chipList;

  constructor(private profileService: ProfileService,private loginService: LoginService,private http: HttpClient,private formBuilder: FormBuilder,private toastr: ToastrService,private spinnerService: Ng4LoadingSpinnerService,private CommonService: CommonService) { 
    this.filteredFruits = this.langCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allLanguage.slice()));
  }

  ngOnInit() {
    this.getProfileDetails();
    this.getLocation();
    
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      profession: [this.profession],
      professionother: [this.profession,[Validators.minLength(3)]],
      speciality: [this.speciality],
      specialityother: [this.speciality,[Validators.minLength(3)]],
      profile_image: ['', Validators.required],
      experience: ['', Validators.required],
      
    });
  }
  /*
   *Function name     : Get Profile Details
   *Function Purpose  : Managing profile details of concerned user 
   *Created date      : July 2019
   *Created By        : Mandeep Singh
  */
  getProfileDetails(){
    this.spinnerService.show();
    let data =<any>JSON.parse(localStorage.getItem('loginData'));
    this.profileService.getProfile(data.id).subscribe(data => {
      if(data.status === 400){
        this.CommonService.refreshToken;
      }
      if(data.data.first_name != null){
        this.firstName= data.data.first_name;
      }
      if(data.data.last_name){
        this.lastName= data.data.last_name;
      }
      if(data.data.profile_image){
        this.image= data.data.profile_image;
      }
      if(data.data.language_preferences){
        this.language= data.data.language_preferences;
      }
      if(data.data.speciality){
      //   if(!this.specialization.includes(data.data.speciality)){
      //     this.specialization.push(data.data.speciality);
      //  }else{
          this.speciality= data.data.speciality;
      // }
      }
      if(data.data.profession){
      //  if(!this.professions.includes(data.data.profession)){
      //     this.professions.push(data.data.profession);
      //  }else{
          this.profession= data.data.profession;
       //}
        
      }
      if(data.data.work_experience !== 'undefined'){
        this.sliderValue= data.data.work_experience;
      }else{
        this.sliderValue= 1;
      }
      
      if(data.data.name_prefix){
        this.name_prefix= data.data.name_prefix;
      }else{
        this.name_prefix= "Dr";
      }
     
      if(data.documents.length>0){
        console.log(data.documents);
        this.medical_proof= data.documents[0].medical_proof.split("/")[6];
        this.medical_proof_link= data.documents[0].medical_proof;
        this.degree_proof= data.documents[0].degree_proof.split("/")[6];
        this.government_proof= data.documents[0].government_proof.split("/")[6];
      }
      this.spinnerService.hide();
    })
  }
  /*
      *Function name     : Add
      *Function Purpose  : Here function uses is pushing indexing of languages and check existence of event  
      *Created date      : July 2019
      *Created By        : Mandeep Singh
  */
  add(event: MatChipInputEvent): void {
    const index = this.language.indexOf(event.value);
    let isExist = this.language.includes(event.value);
    console.log(index);
    if(index === -1 || index ===2 || isExist){
      return ;
    }
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      // Add our fruit
      if ((value || '').trim()) {
        this.language.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.langCtrl.setValue(null);
    }
    this.langError=false;
  }
  /*
    *Function name     : Remove
    *Function Purpose  : The function uses is removing select languages  
    *Created date      : July 2019
    *Created By        : Mandeep Singh
  */
  remove(fruit: string): void {
    const index = this.language.indexOf(fruit);

    if (index >= 0) {
      this.language.splice(index, 1);
      this.allLanguage.push(fruit);
    }
    if(this.language.length == 0){
      this.langError=true;
      this.chipList.errorState = true;
    }
   
  }
  /*
    *Function name     : Selected
    *Function Purpose  : The function uses is selecting given languages  
    *Created date      : July 2019
    *Created By        : Mandeep Singh
  */
  selected(event: MatAutocompleteSelectedEvent): void {
    this.language.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.langCtrl.setValue(null);
    const value = event.option.viewValue;
    const index = this.allLanguage.indexOf(value.trim());
    if (index >= 0) {
      this.allLanguage.splice(index, 1);
    }
  }
  /*
    *Function name     : On Change
    *Function Purpose  : For changes slider value 
    *Created date      : July 2019
    *Created By        : Mandeep Singh
  */
  onChange(event){
    this.sliderValue = event.value;
  }
  /*
    *Function name     : Get Location
    *Function Purpose  : For getting location details
    *Created date      : July 2019
    *Created By        : Mandeep Singh
  */
  getLocation(){
    this.http.get<any>('https://pro.ip-api.com/json/?fields=16510975&key=test-demo-pro')
      .subscribe(res => 
        { 
          this.getAllLanguage(res.countryCode);
        }
    );
  }

  /*
    *Function name     : Get All Languages
    *Function Purpose  : For getting all languajes details
    *Created date      : July 2019
    *Created By        : Mandeep Singh
  */
 getAllLanguage(countryCode){
  this.loginService.getAllLanguage(countryCode).subscribe(data => {
    if(data.data.length >0){
      data.data.forEach(obj => {
        obj.languages.forEach(( value: any,  keys:any) => {
          if(this.language.indexOf(value.language_name.trim()) > -1){
          }else{
            this.allLanguage.push(value.language_name.trim());
          }
        });
      });
    }
  })
}

 private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.allLanguage.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
}

  /*
    *Function name     : On File Changed
    *Function Purpose  : Function uses for file changed event of profile images 
    *Created date      : July 2019
    *Created By        : Mandeep Singh
  */
 onFileChanged(event) {
  if((event.target.files[0]['type'] == 'image/jpeg') || (event.target.files[0]['type'] == 'image/jpg') || (event.target.files[0]['type'] == 'image/png')){
    this.image = event.target.files[0];
    this.selectedFile = event.target.files[0];
    this.preview(event.target.files);
    this.imageError=false;
  }else{
    this.imageError=true;
  }
}
/*
  *Function name     : Preview
  *Function Purpose  : Function uses for file changed event of profile images 
  *Created date      : July 2019
  *Created By        : Mandeep Singh
*/
preview(files) {
  if (files.length === 0)
    return;

  var mimeType = files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    this.message = "Only images are supported.";
    return;
  }

  var reader = new FileReader();
  this.imagePath = files;
  reader.readAsDataURL(files[0]); 
  reader.onload = (_event) => { 
    this.image = reader.result; 
  }
}

/*
  *Function name     : On Change Medical Proof
  *Function Purpose  : Function uses for on changed medicle proof 
  *Created date      : July 2019
  *Created By        : Mandeep Singh
*/
onChangeMedicalProof(event) {
  if(this.fileFormats.includes(event.target.files[0]['type'])){
    this.medical_proof = event.target.files[0];
    this.medical_proof_error=false;
  }else{
    this.medical_proof_error=true;
    this.medical_proof = undefined;
  }
  
}
/*
  *Function name     : On Change degree proof
  *Function Purpose  : Function uses for on changed medicle proof 
  *Created date      : July 2019
  *Created By        : Mandeep Singh
*/
onChangedegreeProof(event) {
  if(this.fileFormats.includes(event.target.files[0]['type'])){
    this.degree_proof = event.target.files[0];
    var filesAmount = event.target.files.length;
    for (let i = 0; i < filesAmount; i++) {
      var reader = new FileReader();

      reader.onload = (event:any) => {
         //this.urls.push(event.target.result);
      }
      this.urls.push(event.target.files[i]);
      reader.readAsDataURL(event.target.files[i]);
}
  this.degree_proof = this.urls;
    
  }else{
    
  }
}
/*
  *Function name     : On Change governement proof
  *Function Purpose  : Function uses for on changed government proof 
  *Created date      : July 2019
  *Created By        : Mandeep Singh
*/
onChangeGovernementProof(event) {
  if(this.fileFormats.includes(event.target.files[0]['type'])){
    this.government_proof = event.target.files[0];
    
  }else{
    
  }
}


/*
  *Function name     : Update User
  *Function Purpose  : Managinig update user details
  *Created date      : July 2019
  *Created By        : Mandeep Singh
*/
 updateUser(){
   let selectedlanguage: string ='';
  if( this.language.length >0){
    this.language.forEach(val => {
      selectedlanguage = selectedlanguage + ',' + val;
    });
    
  }else{
    this.langError=true;
    this.toastr.error('Select Language');
    return; 
  }
  var errorFlag=false;
  if( this.registerForm.get('profession').value === 'OTHER'){
    
    if( this.registerForm.get('professionother').value.length <=0){
      this.registerForm.controls['professionother'].markAsTouched();
      this.registerForm.controls['professionother'].pristine;
      this.registerForm.controls['professionother'].setErrors({'incorrect': true});
      errorFlag=true;
    }
  }

  if( this.registerForm.get('speciality').value === 'OTHER'){
      
    if( this.registerForm.get('specialityother').value.length <=0){
      this.registerForm.controls['specialityother'].markAsTouched();
      this.registerForm.controls['specialityother'].pristine;
      this.registerForm.controls['specialityother'].setErrors({'incorrect': true});
      errorFlag=true;
    }
  }
  const formData = new FormData();
  formData.append('profile_image', this.selectedFile );
  formData.append('first_name', this.registerForm.get('firstName').value );
  formData.append('last_name', this.registerForm.get('lastName').value );

  if(this.registerForm.get('specialityother').value !=null && this.registerForm.get('specialityother').value.length > 0){
    formData.append('speciality', this.registerForm.get('specialityother').value );
  }else{
    if(typeof this.registerForm.get('speciality').value !== 'undefined' && this.registerForm.get('speciality').value !== ''){
      formData.append('speciality', this.registerForm.get('speciality').value);
    }else{
      this.registerForm.controls['speciality'].markAsTouched();
      this.registerForm.controls['speciality'].pristine;
      this.registerForm.controls['speciality'].setErrors({'incorrect': true});
      errorFlag=true;
    }
  }

  //formData.append('speciality', this.registerForm.get('speciality').value );
  formData.append('language_preferences', selectedlanguage.replace(/^,/, '') );


  if(this.registerForm.get('professionother').value !=null && this.registerForm.get('professionother').value.length > 0){
    formData.append('profession', this.registerForm.get('professionother').value );
  }else{
    if(typeof this.registerForm.get('profession').value !== 'undefined' && this.registerForm.get('profession').value !== ''){
      formData.append('profession', this.registerForm.get('profession').value);
    }else{
      this.registerForm.controls['profession'].markAsTouched();
      this.registerForm.controls['profession'].pristine;
      this.registerForm.controls['profession'].setErrors({'incorrect': true});
      errorFlag=true;
    }
  }
 // formData.append('profession', this.registerForm.get('profession').value );
  formData.append('medical_proof', this.medical_proof );
  if( typeof this.degree_proof !== 'undefined'  && this.degree_proof.length >0){
    for (let i = 0; i < this.degree_proof.length; i++) {
      formData.append('degree_proof', this.degree_proof[i] );
    }
  }
  formData.append('government_proof', this.government_proof );
  formData.append('work_experience', this.sliderValue );
  if(errorFlag){
    return false;
  }
  let userData =<any>JSON.parse(localStorage.getItem('loginData'));
  this.profileService.updateUser(userData.id,formData);
 }


}
