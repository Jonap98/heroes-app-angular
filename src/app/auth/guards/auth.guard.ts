
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatchFn, CanActivateFn {

  canMatchTeam: CanMatchFn = (route: Route, segments: UrlSegment[]) => {

  // canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    console.log('Can match');
    console.log({ route, segments });

    return true
  }


  canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> => {
    console.log('Can activate');
    console.log({ route, state });

    return true;
  }

  constructor() { }

}
