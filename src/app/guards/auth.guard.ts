import { AuthService } from '../providers';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthRequired implements CanActivate {
    constructor(
        private _authService: AuthService,
        private router: Router
    ) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this._authService.isAuthenticated().map((data) => {
            if (data.data.isAuth) {
                return true;
            } else {
                return false;
            }
        });
    }
}

@Injectable()
export class AuthNotAllowed implements CanActivate {
    constructor(
        private _authService: AuthService,
        private router: Router
    ) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this._authService.isAuthenticated().map((data) => {
            if (!data.data.isAuth) {
                return true;
            } else {
                this.router.navigate(['/login']);
                return false;
            }
        });
    }
}
