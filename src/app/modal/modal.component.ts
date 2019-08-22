import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogData } from '../DialogData';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  refCheck:boolean=false;
ref:any;
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
  checkReferalCharacters(event){
    
    if(event.target.value.length >= 15){
       this.refCheck = true;
       
    }else{
      this.refCheck = false;
      
    }
   }

   close() {
    this.dialogRef.close();
  }

}
