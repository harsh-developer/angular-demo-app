import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup, FormArray, AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import monthsJson from "../../../assets/json/months.json";

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss']
})


export class FormArrayComponent {
  public addUserForm!: UntypedFormGroup;
  public monthsArr: any;
  public selectedYear: any;

  constructor(public formBuilder: UntypedFormBuilder, public route: ActivatedRoute) {
    this.monthsArr = monthsJson.months;
  }


  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      year: ['', []],
      monthlyData: this.formBuilder.array(
        this.monthsArr.map((month: any) => this.createCapValue(month))
      )
    });
  }

  createCapValue(month: any) {
    const monthGroup = this.formBuilder.group({
      month: [month.value, []], // You can remove this line if not needed
      value: ['', []],
    });

    return monthGroup;
  }


  get form() {
    return this.addUserForm.controls;
  }

  get monthData(): FormArray {
    return <FormArray>this.addUserForm.get('monthlyData');
  }


  printData(index: any) {
    console.log("add user form =>", this.addUserForm);

    this.addUserForm.value['']
  }
}
