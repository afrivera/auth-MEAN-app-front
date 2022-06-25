import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AuthResponse, User } from '../interfaces/auth';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: User;

  get user(){
    return { ...this._user };
  }

  constructor(
    private http: HttpClient
  ) { }

  login( email: string, password: string){

    const url: string = `${ this.baseUrl }/auth`;
    const body = { email, password };

    return this.http.post<AuthResponse>( url, body )
      .pipe(
        tap( resp => {
          if( resp.ok ){
            localStorage.setItem('token-x', resp.token! );
            this._user = {
              name: resp.name!,
              uid: resp.uid!
            }
          }
        }),
        map( resp => resp.ok ),
        catchError(err => of(err.error.msg))
      );

  }

  validToken(){
    const url: string = `${ this.baseUrl }/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token-x') || '');

    return this.http.get( url,{ headers } );
  }
}
