import { Component, OnInit, ViewChild, ViewRef } from '@angular/core';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { Car } from 'src/app/cars/car';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'moment';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/components/_alert';
import { Reservation } from 'src/app/reservations/reservation';

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
  
  public car:any;
  public carid:any;
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
              ) { }

  ngOnInit() {
    this.isUserLogin();

    this.carid = this.route.snapshot.paramMap.get('carid');
    debugger;

    //fill this.car = /car/:carId
    
    this._api.getTypeRequest('/car/' + this.carid).subscribe((res: any) =>{
      console.log("success", res);
      this.car = res;

      //.toISOString().substring(0,10);
      //console.log(this.pickerDirective["endDate"]._d);

    }, err => {
      console.log(JSON.stringify(err));
      this.alertService.error("<div class='h7'><b>Error</b> : "   + err.error.message + '</div>', this.alertOptions)
    });

    // console.log(this.pickerDirective["startDate"]._d);
    // console.log(this.pickerDirective["endDate"]._d);

  }

  public bookingCar(){
    let fromDate = this.pickerDirective["startDate"]._d;
    let toDate = this.pickerDirective["endDate"]._d;

    let user = this._auth.getUserDetails();

    this.reservation = { 
                        userId:user.userId, 
                        carId:this.car.carId, 
                        fromDate:fromDate,
                        toDate: toDate
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

  public choosedDate($event){

    console.log(this.pickerDirective["startDate"]._d);
    console.log(this.pickerDirective["endDate"]._d);

    // this.selected = $event;

    // console.log($event);
    // this.selected.endDate

  }

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