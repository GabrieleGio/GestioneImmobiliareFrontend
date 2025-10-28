import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('authToken');

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
      localStorage.removeItem('authToken');
      router.navigate(['/login']);
    } else if (error.status === 401) {
      alert('Sessione scaduta. Effettua nuovamente il login.');
      localStorage.removeItem('authToken');
      router.navigate(['/login']);
    }

    return throwError(() => error);
  })
);

};
