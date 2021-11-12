import { Component, forwardRef, OnInit, ViewChild, ViewContainerRef, ViewRef } from '@angular/core';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Car } from 'src/app/cars/car';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Moment } from 'moment';
import { DaterangepickerComponent, DaterangepickerDirective } from 'ngx-daterangepicker-material';
// import { DaterangepickerDirective } from 'ngx-daterangepicker-material';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/components/_alert';
import { Reservation } from 'src/app/reservations/reservation';
import { filter } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-bookcar',
  templateUrl: './bookcar.component.html',
  styleUrls: ['./bookcar.component.scss']
  // ,
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => BookcarComponent),
  //     multi: true
  //   }
  // ]
})
export class BookcarComponent implements OnInit {

  // from :Date;
  // to :Date;
  // @ViewChild("daterange") daterange:ViewRef
  // @ViewChild("daterange") pickerDirective:ViewRef

  @ViewChild(DaterangepickerDirective, { static: false }) pickerDirective: DaterangepickerDirective;
  openDatepicker() {
    this.pickerDirective.open();
  }

  
  // @ViewChild(DaterangepickerDirective) picker: DaterangepickerDirective;
  // open() {
  //     this.picker.open();
  //   }

  // @ViewChild(DaterangepickerDirective) picker: DaterangepickerDirective;
  // @ViewChild(DaterangepickerDirective, { static: false }) pickerDirective: DaterangepickerDirective;
  //ngx-daterangepicker-material 
  // @ViewChild("selected1", { static: false }) pickerDirective: ViewRef;
  //@ViewChild("selected1", { static: false }) pickerDirective;

  //@ViewChild("selected1", { static: false }) pickerDirective: DaterangepickerComponent;
  // @ViewChild(DaterangepickerComponent) pickerDirective1: DaterangepickerComponent;

  // selected: {startDate: Moment, endDate: Moment};
  selected: { startDate: Moment, endDate: Moment } = { startDate: moment(), endDate: moment() };

  invalidDates: moment.Moment[] = [];

  // tooltips = [
  //   { date: moment(), text: 'Today is just unselectable' },
  //   { date: moment().add(2, 'days'), text: 'Yeeeees!!!' }
  // ];
  
  isInvalidDate = (m: moment.Moment) => {
    // Disbale Sundays and Saturdays
    //return m.weekday() === 0 || m.weekday() === 6;
    return false;
  }

  // isTooltipDate = (m: moment.Moment) => {
  //   const tooltip = m.weekday() === 0 || m.weekday() === 6;
  //   if (tooltip) {
  //     return 'Weekends not allowed!';
  //   } else {
  //     return false;
  //   }
  // }
  
  public car:Car;
  public carid:number = 0;
  public reservation: any;

  // public cars: Car [] = [
  //   {carId: 0, carName: "Lamborgini Diablo", licensePlate: "L0001", used: false,  imageName: "lamborgini"},
  //   {carId: 1, carName: "Ferrary", licensePlate: "F0001", used: false,  imageName: "ferrari"},
  //   {carId: 2, carName: "Rolls-Royce", licensePlate: "R0001", used: false,  imageName: "rolls-royce"},
  //   {carId: 3, carName: "Audi", licensePlate: "A0001", used: false,  imageName: "audi"},
  //   {carId: 4, carName: "Papamobil", licensePlate: "P0001", used: true,  imageName: "papamobil"}
  // ];
  
  // dateRange = new FormGroup({
  //   start: new FormControl(),
  //   end: new FormControl()
  // });
  
  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(
              private route:ActivatedRoute, 
              private router:Router,
              private _auth:AuthService,
              private _api:ApiService,
              private alertService:AlertService
              ) {
                
                

                // this.router.events
                //   .pipe(filter(e => e instanceof NavigationStart))
                //   .subscribe((e: NavigationStart) => {
                //     const navigation  = this.router.getCurrentNavigation();

                //     let fromDate = this.pickerDirective["startDate"]._d;
                //     let toDate = this.pickerDirective["endDate"]._d;

                //     fromDate = navigation.extras.state ? navigation.extras.state.dateRange.fromDate : new Date();
                //     toDate = navigation.extras.state ? navigation.extras.state.dateRange.toDate : new Date();

                //     this.pickerDirective["startDate"]._d = new Date(fromDate);
                //     this.pickerDirective["endDate"]._d = new Date(toDate);

                //     console.log('dates after load navigation data',navigation.extras.state);
                //     console.log("fromDate ==> ", new Date(fromDate), "toDate ==> ", new Date(toDate));

                //   });
                
              }

  ngOnInit() {
    this.isUserLogin();

    if(this.route.snapshot.paramMap.get('car_id'))
      this.carid = Number(this.route.snapshot.paramMap.get('car_id'));
    else
      this.router.navigate(['/']);
    
    this._api.getTypeRequest('/car/' + this.carid).subscribe((res: any) =>{
      console.log("success", res);
      this.car = res;
    }, err => {
      console.log(JSON.stringify(err));
      this.alertService.error("<div class='h7'><b>Error</b> : "   + err.error.message + '</div>', this.alertOptions)
    });

    // this.pickerDirective1.startDate = moment("2021-01-01");
    // this.pickerDirective1.endDate = moment("2021-02-02");
    // this.pickerDirective1.updateView()
    //   this.pickerDirective.updateCalendars();

    // this.pickerDirective["startDate"]._d = new Date("2021-01-01");
    // this.pickerDirective["endDate"]._d = new Date("2021-02-02");
    // this.pickerDirective.updateView()

    console.log("this.pickerDirective == ", this.pickerDirective);
    // console.log("this.pickerDirective == ", this.picker);
    
    // console.log(this.pickerDirective)    ;
    // this.pickerDirective["startDate"]._d = moment();
    // this.pickerDirective["endDate"]._d = moment().add(3,'d');


  }

  public bookingCar(){
    // let fromDate = this.pickerDirective["startDate"]._d;
    // let toDate = this.pickerDirective["endDate"]._d;

    // let user = this._auth.getUserDetails();

    this.reservation = { 
                        userId:this._auth.getUserDetails().userId, //user.userId, 
                        carId: this.car.carId, 
                        fromDate: this.selected.startDate.toISOString().substring(0,10),
                        toDate: this.selected.endDate.toISOString().substring(0,10)
                      };

    console.log(this.reservation);

    // this._api.postTypeRequest('/reservations/add', this.reservation ).subscribe((res: any) =>{
    //   console.log("success", res);
    //   this.car = res;
    // }, err => {
    //   // debugger;
    //   console.log(JSON.stringify(err));
    //   this.alertService.error("<div class='h7'><b>Error</b> : "   + err.error.message + '</div>', this.alertOptions)
    // });

    //console.log(this.selected.startDate, this.selected.endDate);
    // this.selected.startDate
    // this.selected.endDate
  }

  public choosedDate(event){

    //console.log(this.selected);

    console.log(event);
    
    this.selected.startDate = this.pickerDirective["startDate"]._d;
    this.selected.endDate = this.pickerDirective["endDate"]._d;

    console.log(this.selected);

    // console.log(this.pickerDirective["startDate"]._d);
    // console.log(this.pickerDirective["endDate"]._d);

    // this.selected = $event;

    // this.selected.endDate

  }

  // public choosedDate1(event) {
  //   console.log({ event });
  // }

  isUserLogin(){
    let userDetails = this._auth.getUserDetails();
    if(userDetails != null){
      // console.log(this._auth.getUserDetails());
      this._auth.isLogin = true;
      //this.user = userDetails.username; 
    } else {
      this.router.navigate(['/login']);
    }
  }

}