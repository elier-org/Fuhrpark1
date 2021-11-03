import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarCardComponent } from './car-card/car-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [CarCardComponent],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [CarCardComponent]
})
export class ComponentsModule { }
