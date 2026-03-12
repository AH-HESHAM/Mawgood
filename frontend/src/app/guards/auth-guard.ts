import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuth().pipe(
    map(() => true),
    catchError((err) => {
      if (route.routeConfig?.path === 'cart') {
        return of(true);
      }
      router.navigate(['/login']);
      return of(false);
    }),
  );
};
