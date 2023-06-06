
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthServiceService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class PublicGuard {

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) { }

  private checkAuthStatus(): boolean | Observable<boolean> {

    return this.authService.checkAuthentication()
      .pipe(
        tap( isAuthenticated => console.log(isAuthenticated) ),
        tap( isAuthenticated => {
          if( isAuthenticated )
            this.router.navigate(['./']);
        }),
        map( isAuthenticated => !isAuthenticated )

      )

  }


  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    console.log('Can match');
    console.log({ route, segments });

    return this.checkAuthStatus();
  }


  canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> => {
    console.log('Can activate');
    console.log({ route, state });

    return this.checkAuthStatus();
  }


}
