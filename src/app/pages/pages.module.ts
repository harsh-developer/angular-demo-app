import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { ConditionalSelectComponent } from './conditional-select/conditional-select.component';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetCordinatesComponent } from './get-cordinates/get-cordinates.component';
import { ApexChartComponent } from './apex-chart/apex-chart.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { FormArrayComponent } from './form-array/form-array.component';

@NgModule({
  declarations: [
    ConditionalSelectComponent,
    SelectComponent,
    GetCordinatesComponent,
    ApexChartComponent,
    FormArrayComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
