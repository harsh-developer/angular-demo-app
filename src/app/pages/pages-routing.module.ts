import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConditionalSelectComponent } from './conditional-select/conditional-select.component';
import { SelectComponent } from './select/select.component';



const routes: Routes = [
  {
    path: 'conditional-select',
    component: ConditionalSelectComponent
  },
  {
    path: 'select',
    component: SelectComponent
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})



export class PagesRoutingModule { }
