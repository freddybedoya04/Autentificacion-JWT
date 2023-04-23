import { Injectable } from '@angular/core';
import {getCookie,setCookie,removeCookie} from 'typescript-cookie'
import jwtDecode ,{JwtPayload}from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token:string){

  setCookie('token-trello',token,{expires:365,path:'/'});
  }
  getToken(){
    const token=getCookie('token-trello');
    return token;
  }

  removeToken(){
    removeCookie('token-trello');
  }
  isValidToken(){
    const token=this.getToken();
    if(!token){
      return false
    }
    const decideToken =jwtDecode<JwtPayload>(token);
    if(decideToken && decideToken?.exp){
      const tokenDate= new Date(0);
      tokenDate.setUTCSeconds(decideToken.exp);
      const today= new Date();

      return tokenDate.getTime() >today.getTime();
    }
    return false;
  }
}
