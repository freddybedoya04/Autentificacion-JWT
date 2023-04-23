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
    const isValidtoken= this._token.isValidToken();
    if(!isValidtoken){
      this.route.navigate(['/login'])
      return false;
    }
    return true;
  }
  
}
