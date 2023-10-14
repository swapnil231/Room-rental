import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form } from '@angular/forms';
import { Rental } from '../rental-modal';
import { ImageSnippet } from '../image-uplod/image/image.component';

@Component({
  selector: 'app-editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.scss'],
})
export class EditableComponent implements OnInit {
  ngOnInit(): void {
    this.setorignalvalue();
  }

  @Output() entityupdated = new EventEmitter();
  @Input() entity: any;
  @Input() type: any;
  @Input() htmltagtype: any;
  @Input() option!: any[];
  @Input() rental!: Rental;
  // entityfield: any;
  // @Input('yu').set field(entityfield: string) {
  //   this.entityfield = entityfield;
  // }
  @Input() field: any;
  @Input() classname: any;

  isinputactive = false;
  theoriginalentity: any;

  cancle() {
    this.getentityvalue = this.theoriginalentity;
    this.isinputactive = false;
  }

  entityupdate() {
    if (this.getentityvalue !== this.theoriginalentity) {
      console.log(this.entityupdate);
      this.entityupdated.emit({
        data: { [this.field]: this.getentityvalue },
        notifier: this.inputNotifier,
      });
    }
  }

  inputNotifier = (error: any) => {
    if (error) {
      console.log(error);

      this.cancle();

      return;
    }
    this.setorignalvalue();
    this.isinputactive = false;
  };

  private setorignalvalue() {
    this.theoriginalentity = this.getentityvalue;
  }

  private get getentityvalue() {
    return this.entity[this.field];
  }
  private set getentityvalue(value: any) {
    this.entity[this.field] = value;
  }
}
