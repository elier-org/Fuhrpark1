import { Injectable } from "@angular/core";
//import { Observable } from "rxjs";
import { Observable } from 'rxjs'; 
import { User } from "./user";
import { HttpClient} from '@angular/common/http';
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiServerUrl = environment.apiBaseUrl;
    public isLogin = false;

    constructor(private http: HttpClient) { 

    }

    public getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiServerUrl}/users`);
    }

    public getSingleUser(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiServerUrl}/{user}`);
    }

    public login(autenticationData: any): Observable<any> {
        return this.http.post<any>(`${this.apiServerUrl}/authenticate`, autenticationData);
    }

}