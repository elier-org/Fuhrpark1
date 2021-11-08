import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarCardComponent } from './car-card/car-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [CarCardComponent, NavbarComponent],
  imports: [
    CommonModule,
    BrowserModule,
    // FontAwesomeModule,
    NgbModule
  ],
  exports: [CarCardComponent, NavbarComponent]
})
export class ComponentsModule { }
