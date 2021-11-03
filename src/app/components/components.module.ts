import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarCardComponent } from './car-card/car-card.component';



@NgModule({
  declarations: [CarCardComponent],
  imports: [
    CommonModule
  ],
  exports: [CarCardComponent]
})
export class ComponentsModule { }
