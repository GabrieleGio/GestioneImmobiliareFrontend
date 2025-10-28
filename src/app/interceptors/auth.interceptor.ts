import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const token = authService.getToken();

  let clonedRequest = req;

  if (token) {
    clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(clonedRequest).pipe(
    catchError((error) => {
      if (error.status === 0) {
        alert('Impossibile contattare il server. Riprova più tardi.');
        authService.removeToken();
        router.navigate(['/login']);
      } else if (error.status === 401) {
        alert('Sessione scaduta. Effettua nuovamente il login.');
        authService.removeToken();
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
