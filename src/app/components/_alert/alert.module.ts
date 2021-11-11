// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AlertComponent } from "./alert.component";

// import { AlertComponent } from './alert.component';

@NgModule({
    imports: [CommonModule,NgbModule],
    declarations: [AlertComponent],
    exports: [AlertComponent]
})
export class AlertModule { }