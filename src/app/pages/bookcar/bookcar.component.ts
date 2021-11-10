import { Component, OnInit, ViewChild, ViewRef } from '@angular/core';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { Car } from 'src/app/cars/car';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'moment';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';

@Component({
  selector: 'app-bookcar',
  templateUrl: './bookcar.component.html',
  styleUrls: ['./bookcar.component.scss']
})
export class BookcarComponent implements OnInit {

  // from :Date;
  // to :Date;
  //@ViewChild("daterange") daterange:ViewRef

  // @ViewChild(DaterangepickerDirective) picker: DaterangepickerDirective;
  // @ViewChild(DaterangepickerDirective, { static: false }) pickerDirective: DaterangepickerDirective;
  @ViewChild("selected1", { static: false }) pickerDirective: ViewRef;

  selected: {startDate: Moment, endDate: Moment};

  selected1;
  
  public car;
  public cars: Car [] = [
    {carId: 0, carName: "Lamborgini Diablo", licensePlate: "L0001", used: false,  imageName: "lamborgini"},
    {carId: 1, carName: "Ferrary", licensePlate: "F0001", used: false,  imageName: "ferrari"},
    {carId: 2, carName: "Rolls-Royce", licensePlate: "R0001", used: false,  imageName: "rolls-royce"},
    {carId: 3, carName: "Audi", licensePlate: "A0001", used: false,  imageName: "audi"},
    {carId: 4, carName: "Papamobil", licensePlate: "P0001", used: true,  imageName: "papamobil"}
  ];
  
  // dateRange = new FormGroup({
  //   start: new FormControl(),
  //   end: new FormControl()
  // });

  constructor(
              private route:ActivatedRoute, 
              private router:Router, 
              ) { }

  ngOnInit() {
    //fill this.car = /car/:carId

    let carid = this.route.snapshot.paramMap.get('carid');
    this.car = this.cars[Number(carid)];
  }

  public bookingCar(){
    console.log(this);
    console.log(this.pickerDirective["startDate"]._d);
    console.log(this.pickerDirective["endDate"]._d);


    //console.log(this.selected.startDate, this.selected.endDate);
    // this.selected.startDate
    // this.selected.endDate
  }

  public choosedDate($event){

    // this.selected = $event;

    // console.log($event);
    // this.selected.endDate

  }

}