import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { BookcarComponent } from './bookcar/bookcar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [HomeComponent, BookcarComponent],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [HomeComponent, BookcarComponent]
})
export class PagesModule { }
