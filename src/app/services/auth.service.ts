import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogin = false;

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
