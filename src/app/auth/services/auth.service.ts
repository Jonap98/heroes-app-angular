import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { Observable, tap, of, map, catchError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthServiceService {

  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }

  get currentUser(): User | undefined {
    if( !this.user ) return undefined;

    // StructuredClone es propio de javascript, permite realizar un clon profundo de un objeto sin
    // importar que tan extenso sea, alternativa al spread {...this.user}
    return structuredClone(this.user);
  }

  login( email: string, password: string ): Observable<User> {
    // this.http.post('login',{ email, password })
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap( user => this.user = user ),
        tap( user => localStorage.setItem( 'token', user.id.toString() ) )
      )
  }

  checkAuthentication(): Observable<boolean> | boolean {
    if( !localStorage.getItem('token') ) return of(false);

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user ),
        map( user => !!user ), // Devuelve un valor booleano, true
        catchError( error => of(false) )
      )

  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }

}
