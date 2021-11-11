import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
// export class AuthInterceptorService {
//   constructor() { }
// }

export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(req, next);
    // console.log("Interception In Progress"); // Interception Stage
    // console.log(req.headers.get("skip"));
    if(!req.url.endsWith('/authenticate'))
      if (req.headers.get("skip") == null){
        let token: string = this._auth.getToken();// localStorage.getItem('token'); // This retrieves a token from local storage
        
        req = req.clone({ headers: req.headers.set('authorization', 'Bearer ' + JSON.parse(token)) });// This clones HttpRequest and Authorization header with Bearer token added
        req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
      }
 
    return next.handle(req)
        .pipe(
           catchError((error: HttpErrorResponse) => {
                // Catching Error Stage
                if (error && error.status === 401) {
                    console.log("ERROR 401 UNAUTHORIZED") // in case of an error response the error message is displayed
                }
                const err = error.error.message || error.statusText;
                return throwError(error); // any further errors are returned to frontend                    
           })
        );
  }  
}