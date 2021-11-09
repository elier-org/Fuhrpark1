import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { BookcarComponent } from './bookcar/bookcar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgModel } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [HomeComponent, BookcarComponent, LoginComponent, AdminPanelComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ComponentsModule,
    
    // FontAwesomeModule
  ],
  exports: [HomeComponent, BookcarComponent, LoginComponent, AdminPanelComponent, ]
})
export class PagesModule { }
