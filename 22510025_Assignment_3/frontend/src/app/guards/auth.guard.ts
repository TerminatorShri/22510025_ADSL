import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap, map } from 'rxjs/operators';
import { selectUser } from '../store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(selectUser).pipe(
      map((user) => {
        if (user && user.role_id) {
          console.log('User role:', user.role_id, typeof user.role_id);
          console.log(
            'Required role:',
            next.data['role_id'],
            typeof next.data['role_id']
          );
          const requiredRole = next.data['role_id'];
          if (user.role_id === requiredRole) {
            return true;
          } else {
            this.router.navigate(['/unauthorized']);
            return false;
          }
        } else {
          this.router.navigate(['/auth']);
          return false;
        }
      }),
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          // Optional: Add a message or log if access is denied
        }
      })
    );
  }
}
