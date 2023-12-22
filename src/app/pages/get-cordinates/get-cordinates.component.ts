import { Component } from '@angular/core';

@Component({
  selector: 'app-get-cordinates',
  templateUrl: './get-cordinates.component.html',
  styleUrls: ['./get-cordinates.component.scss']
})
export class GetCordinatesComponent {


  getCordinates(event: any) {
    console.log(event);
  }
}
