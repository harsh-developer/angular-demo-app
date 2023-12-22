import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConditionalSelectComponent } from './conditional-select/conditional-select.component';
import { SelectComponent } from './select/select.component';
import { GetCordinatesComponent } from './get-cordinates/get-cordinates.component';
import { ApexChartComponent } from './apex-chart/apex-chart.component';
import { FormArrayComponent } from './form-array/form-array.component';



const routes: Routes = [
  {
    path: 'conditional-select',
    component: ConditionalSelectComponent
  },
  {
    path: 'select',
    component: SelectComponent
  },
  {
    path: 'form-array',
    component: FormArrayComponent
  },
  {
    path: 'get-cordinates',
    component: GetCordinatesComponent
  },
  {
    path: 'apex-chart',
    component: ApexChartComponent
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})



export class PagesRoutingModule { }
