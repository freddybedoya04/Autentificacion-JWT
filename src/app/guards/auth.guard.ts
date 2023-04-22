import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from '@services/token.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _token:TokenService,private route:Router){

  }
  canActivate():boolean{
    const token= this._token.getToken();
    if(!token){
      this.route.navigate(['/login'])
      return false;
    }
    return true;
  }
  
}
