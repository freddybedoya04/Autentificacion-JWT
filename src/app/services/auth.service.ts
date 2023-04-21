import { Injectable } from '@angular/core';
import {HttpClient, HttpParameterCodec} from '@angular/common/http';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl:string=environment.API_URL;
  constructor(private http:HttpClient) { }

  login(email:string,password:string){
   return this.http.post(this.apiUrl + '/api/v1/auth/login',{
      email,
      password
    })
  }
  register(email:string,password:string,name:string){
    return this.http.post(this.apiUrl + '/api/v1/auth/register',{
       email,
       password,
       name
     })
   }
   isAvailable(email:string){
    return this.http.post<{isAvailable:boolean}>(this.apiUrl + '/api/v1/auth/is-available',{
      email
    })
   }
}
