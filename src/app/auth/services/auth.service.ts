import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AuthResponse, User } from '../interfaces/auth';
import { catchError, map, of, tap, Observable } from 'rxjs';

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

  responseOk( resp: AuthResponse  ):void {
    localStorage.setItem('token-x', resp.token! );
    this._user = {
      name: resp.name!,
      uid: resp.uid!,
      email: resp.email!
    }
  }

  register( name: string, email: string, password: string){
    const url = `${ this.baseUrl }/auth/new`;
    const body = { name, email, password };
    return this.http.post<AuthResponse>( url, body)
            .pipe(
              tap( resp => {
                if( resp.ok ){
                  this.responseOk( resp );
                }
              }),
              map( resp => resp.ok ),
              catchError(err => of(err.error.msg))
            );
  }

  login( email: string, password: string){

    const url: string = `${ this.baseUrl }/auth`;
    const body = { email, password };

    return this.http.post<AuthResponse>( url, body )
      .pipe(
        tap( resp => {
          if( resp.ok ){
            this.responseOk( resp );
          }
        }),
        map( resp => resp.ok ),
        catchError(err => of(err.error.msg))
      );

  }

  validToken(): Observable<boolean>{
    const url: string = `${ this.baseUrl }/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token-x') || '');

    return this.http.get<AuthResponse>( url,{ headers } )
      .pipe(
        map( resp => {
          this.responseOk( resp );
          return resp.ok;
        }),
        catchError( err => of( false ))
      );
  }

  logout(){
    localStorage.clear();
  }
}
