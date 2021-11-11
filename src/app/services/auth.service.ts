import { Injectable } from '@angular/core';
import { User } from 'src/app/users/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogin = false;
  public user:User;

  constructor() { }

  getUserDetails(){
    
    return localStorage.getItem('userData') ? 
      JSON.parse(localStorage.getItem('userData')): null;
  }

  getKeepMeSigned(){
    return localStorage.getItem('keepMeSigned') ? 
      JSON.parse(localStorage.getItem('keepMeSigned')): null;
  }

  setDataInLocalStorage(variableName, data) {
    localStorage.setItem(variableName, data);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  clearStorage(){
    localStorage.clear();
  }

}
