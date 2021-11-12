import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/users/user';
import { UserService } from 'src/app/users/user.service';

import "@angular/compiler";
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbAlert, NgbCheckBox, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { AlertService } from 'src/app/components/_alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  staticAlertClosed = false;
  successMessage = '';


  ngOnInit(): void {
    this.isUserLogin();

  }


  user:string;
  password:string;

  logedUser:User;

  public errorMessage = "";


  public sendingData = false;

  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(private router: Router, 
              private userService:UserService, 
              private _api:ApiService,
              private _auth: AuthService,
              private _router: Router,
              public alertService: AlertService) {}



  onSubmit(){
    //login
    //api.send(this.user, this.password);

    //if the response is ok then 
    //this.router.navigate(['']);
    console.log("post login");

    //let response = this.userservice.login({username: this.user, password: this.password});
        
        this._api.postTypeRequest('/authenticate', {username: this.user, password: this.password}).subscribe((res: any) =>{
          console.log("res.status", res.status);
          //if(res.status == "success") {
            console.log("Success", "is logged");
            // this.userName = res.user.username;
            //let userData = {userId: res.userId, userName: res.userName};
            this._auth.setDataInLocalStorage('userData', JSON.stringify({userId: res.userId, userName: res.userName}));
            this._auth.setDataInLocalStorage('token', JSON.stringify(res.token));
            
            this._router.navigate(['/']);
    
            this.userService.isLogin = true;
            // this.dataService.getNotifications();

            //this.dataService.recaptchaV3Subscription.unsubscribe();
          //} else {
            //this._notSuccess.next(res);
            // this.errorMessage = res;

            // this._auth.setDataInLocalStorage('userData', JSON.stringify(res.user));
            // this._auth.setDataInLocalStorage('token', JSON.stringify(res.token));

            //console.log("_notSuccess", res);
            //this.alertService.error('Error :' + res, this.alertOptions)
         // }
          //this.sendingData = false;
    
        }, err => {
          // console.log("error: ", err)
          
          this.alertService.error("<div class='h7'><b>Error</b> : "   + err.error.message + '</div>', this.alertOptions)
          // this.errorMessage = err['error'].errors;
          //this._notSuccess.next(err['error']);
          // this.errorMessage = err['message']
          //this.sendingData = false;
        });



    console.log(this);
  }
  
  isUserLogin(){
    let userDetails = this._auth.getUserDetails();
    if(userDetails != null){
      // console.log(this._auth.getUserDetails());
      this._auth.isLogin = true;
      this._auth.user = userDetails.username;
      //this.user = userDetails.username; 
    }
  }

  logout(){
    this._auth.clearStorage();
    this._router.navigate(['/login']);
    this._auth.isLogin = false;
  }



}
