import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { ConditionalSelectComponent } from './conditional-select/conditional-select.component';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ConditionalSelectComponent,
    SelectComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
