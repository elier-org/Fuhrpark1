import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarCardComponent } from './car-card/car-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [CarCardComponent],
  imports: [
    CommonModule,
    BrowserModule,
    // FontAwesomeModule,
    NgbModule
  ],
  exports: [CarCardComponent]
})
export class ComponentsModule { }
