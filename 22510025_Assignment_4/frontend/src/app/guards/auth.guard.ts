import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { selectUser } from '../store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.select(selectUser).pipe(
      map((user) => {
        if (user && user.role) {
          const requiredRole = next.data['role'];
          if (user.role === requiredRole) {
            return true;
          } else {
            this.router.navigate(['/unauthorized']);
            return false;
          }
        } else {
          this.router.navigate(['/auth']);
          return false;
        }
      })
    );
  }
}
