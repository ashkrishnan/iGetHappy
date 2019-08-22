/*
  *Module Name    : Time-Picker                              
  *Module Purpose : Managing of time picer section
  *Created date   : July 2019
  *Created By     : Mandeep Singh
*/
import { Component, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'doc-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: [ './timepicker.component.scss' ],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: TimePickerComponent, multi: true }]
})
export class TimePickerComponent implements ControlValueAccessor {
  @Output() close = new EventEmitter();

  auto = true;
  hhmm = 'hh';
  ampm = 'am';
  dial = [];
  hour = '12';
  minute = '00';

  private date = new Date;
  private onChange = (v: Date) => {};
  private onTouched = () => {};

  constructor() {
    const j = 84;
    for (let min = 1; min <= 12; min++) {
      const hh = String(min);
      const mm = String('00' + (min * 5) % 60).slice(-2);
      const x = 1 + Math.sin(Math.PI * 2 * (min / 12));
      const y = 1 - Math.cos(Math.PI * 2 * (min / 12));
      this.dial.push({ top: j * y + 'px', left: j * x + 'px', hh, mm });
    }
  }
 /*
    *Function name     : Write Value
    *Function Purpose  : Managing hours and time 
    *Created date      : July 2019
    *Created By        : Mandeep Singh
  */
  public writeValue(v: Date) {
    this.date = v || new Date;
    let hh = this.date.getHours(),
      mm = this.date.getMinutes();
    this.ampm = hh < 12 ? 'am' : 'pm';
    this.hour = String(hh % 12 || 12);
    this.minute = String('00' + (mm - mm % 5)).slice(-2);
  }
/*
    *Function name     : Register On Change
    *Function Purpose  : Managing registeration of time 
    *Created date      : July 2019
    *Created By        : Mandeep Singh
  */
  public registerOnChange = (fn: any) => this.onChange = fn;
  /*
    *Function name     : Register On Touched
    *Function Purpose  : Managing registeration of touched 
    *Created date      : July 2019
    *Created By        : Mandeep Singh
  */
  public registerOnTouched = (fn: any) => this.onTouched = fn;

  timeChange($event) {
    if (this.hhmm === 'hh') {
      this.hour = $event;
      if (this.auto) {
        this.hhmm = 'mm';
      }
    }
    else {
      this.minute = $event;
    }
  }
/*
    *Function name     : Rotate Hand
    *Function Purpose  : Managing roate hand 
    *Created date      : July 2019
    *Created By        : Mandeep Singh
  */
  rotateHand() {
    const deg = this.hhmm === 'hh' ? +this.hour * 5 : +this.minute;
    return `rotate(${ deg * 6 }deg)`;
  }
/*
    *Function name     : Cancel
    *Function Purpose  : Cancel the selected time
    *Created By        : Mandeep Singh
  */
  cancel = () => this.close.emit();
  /*
    *Function name     : OK
    *Function Purpose  : Set time hours and miniutes
    *Created By        : Mandeep Singh
  */
  ok() {
    let hh = +this.hour + (this.ampm === 'pm' ? 12 : 0);
    if (this.ampm === 'am' && hh === 12 || hh === 24) {
      hh -= 12;
    }
    this.date.setHours(hh);
    this.date.setMinutes(+this.minute);
    this.onChange(this.date);
    this.close.emit();
  }
}
