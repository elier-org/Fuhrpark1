import { APP_ID, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user:string;
  password:string;

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  onSubmit(){
    //login
    //api.send(this.user, this.password);

    //if the response is ok then 
    //this.router.navigate(['']);

    console.log(this);
  }

}
