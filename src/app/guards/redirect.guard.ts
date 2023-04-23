import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router } from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from '@services/token.service'

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {
  constructor(private _token:TokenService,private route:Router){

  }
  canActivate():boolean{
    const isValidToken= this._token.isValidToken();
    if(isValidToken){
      this.route.navigate(['/app'])
    }
    return true;
  }
  
}
