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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  private _success = new Subject<string>();
  private _notSuccess = new Subject<string>();

  staticAlertClosed = false;
  successMessage = '';

  @ViewChild('staticAlert', {static: false}) staticAlert: NgbAlert;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  ngOnInit(): void {
    this.isUserLogin();

    setTimeout(() => this.closeAlert(), 20000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.closeAlert();
        //this.selfClosingAlert.close();
      }
    });

    this._success.next(`${new Date()} - Message successfully changed.`); 
  }

  private closeAlert() {
    this.successMessage = ''
    this.staticAlertClosed = true
  }

  user:string;
  password:string;

  logedUser:User;

  // @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;
  // @ViewChild('selfClosingAlertError', {static: false}) selfClosingAlertError: NgbAlert;
  


  public errorMessage = "";


  public sendingData = false;

  constructor(private router: Router, 
              private userService:UserService, 
              private _api:ApiService,
              private _auth: AuthService,
              private _router: Router) {}



  onSubmit(){
    //login
    //api.send(this.user, this.password);

    //if the response is ok then 
    //this.router.navigate(['']);
    console.log("post login");

    //let response = this.userservice.login({username: this.user, password: this.password});
        
        this._api.postTypeRequest('/authenticate', {username: this.user, password: this.password}).subscribe((res: any) =>{
          if(res.status == "success") {
            console.log("Success", "is logged")
            // this.userName = res.user.username;

            this._auth.setDataInLocalStorage('userData', JSON.stringify(res.user));
            this._auth.setDataInLocalStorage('token', JSON.stringify(res.token));
    
            // this.userService.isLogin = true;

            // this.dataService.getNotifications();

            //this.dataService.recaptchaV3Subscription.unsubscribe();
          } else {
            //this._notSuccess.next(res);
            // this.errorMessage = res;
            console.log("_notSuccess", res);
          }
          //this.sendingData = false;
    
        }, err => {
          console.log("error: ", err)
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
      this.user = userDetails.username; 
    }
  }

  logout(){
    this._auth.clearStorage();
    this._router.navigate(['/']);
    this._auth.isLogin = false;
  }

}
