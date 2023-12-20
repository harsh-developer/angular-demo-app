import { Component } from '@angular/core';
import optionJson from '../../../assets/json/select-option.json';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  public selectedValue: any = 1;
  public options: any;

  ngOnInit() {
    this.options = optionJson.options;
    console.log(this.options);
  }

  printSelect() {
    console.log(this.selectedValue);
  }
}
