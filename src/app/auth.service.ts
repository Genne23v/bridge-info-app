import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  private getToken(): any { //string
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    if (!token){
      return false;
    }
    const isExpired = this.jwtHelper.isTokenExpired(token);

    return !isExpired;
  }

getUser(): User {
  const token = this.getToken();
  if (!token){
    return null;
  }

  const payload = this.jwtHelper.decodeToken(token);
  return {
    username: payload.sub,
    fullname: payload.name,
  }
}

  login(user: User): Observable<any>{
    const url = `${environment.authUrl}/login`
    return this.http.post<any>(url, user).pipe(tap(data => data.token && localStorage.setItem('token', data.token)));
  }
}
