import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
        	    private router: Router,
              public _auth:AuthService ) { }

  ngOnInit(): void {
  }

  logOut(){
    //log out service
    this._auth.clearStorage()

    //navigate to the login page
    this.router.navigate(['/login']);
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
