import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup, FormArray, AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import monthsArr from "../../../assets/json/months.json";

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss']
})
export class FormArrayComponent {
  public addUserForm!: UntypedFormGroup;
  public monthsArr: any;

  constructor(public formBuilder: UntypedFormBuilder, public route: ActivatedRoute) {
    this.monthsArr = monthsArr;
  }


  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      name: ['', []],
      email: ['', []],
      monthlyData: this.formBuilder.array([])
    })

    this.monthsArr.months.forEach((month: any) => {
      this.monthlyDataArray.push(this.formBuilder.control(''));
    });
  }


  get form() {
    return this.addUserForm.controls;
  }

  get monthlyDataArray(): any {
    return this.addUserForm.get('monthlyData') as FormArray;
  }


  createUser() {
    console.log("add user form =>", this.addUserForm);

    this.addUserForm.value['']
  }
}
