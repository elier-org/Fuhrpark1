import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/cars/car';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/components/_alert';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // User user;

  from :any;
  to :any;

  model: NgbDateStruct;

  public title = "Fuhrpark Management";

  // public cars!: Car [] = [];
  public cars: Car [];
  //  = [
  //   {carId: 0, carName: "Lamborgini Diablo", licensePlate: "L0001", used: false,  imageName: "ferrari"},
  //   {carId: 1, carName: "Ferrary", licensePlate: "F0001", used: false,  imageName: "ferrari"},
  //   {carId: 2, carName: "Rolls-Royce", licensePlate: "R0001", used: true,  imageName: "ferrari"},
  //   {carId: 3, carName: "Audi", licensePlate: "A0001", used: false,  imageName: "ferrari"},
  //   {carId: 4, carName: "Papamobil", licensePlate: "P0001", used: false,  imageName: "ferrari"}
  // ];
  
  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(private router:Router, private _auth:AuthService,private _api:ApiService, private alertService:AlertService) { }

  ngOnInit() {
    this.isUserLogin();

    this.from = moment().toDate().toISOString().substring(0,10);
    this.to = moment().add(15,'d').toDate().toISOString().substring(0,10); 

    this.dateChange();

  }

  dateChange(){
    //update carlist using the dates from and to to filter the result
    // console.log(this.from, this.to);
    // console.log(this);

    //get carlist using todate like reference
    this._api.postTypeRequest('/cars/filter',{"fromDate" : this.from, "toDate" : this.to }).subscribe((res: any) =>{
      console.log("success", res);
      this.cars = res;
    }, err => {
      // debugger;
      console.log(JSON.stringify(err));
      this.alertService.error("<div class='h7'><b>Error</b> : "   + err.error.message + '</div>', this.alertOptions)
    });
  }

  isUserLogin(){
    let userDetails = this._auth.getUserDetails();
    if(userDetails != null){
      // console.log(this._auth.getUserDetails());
      this._auth.isLogin = true;
      //this.user = userDetails.username; 
    } else {
      this._auth.isLogin = false;
      this.router.navigate(['/login']);
    }
  }

}
