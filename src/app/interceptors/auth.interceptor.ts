import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Recupero il token dal local storage
  const token = localStorage.getItem('authToken');

  // Aggiungo il token all'header della richiesta
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    // Procedo con la richiesta clonata che contiene il token
    return next(clonedRequest);
  }

  // Se non c'è un token, semplicemente procedo senza aggiungere l'auth header
  return next(req);
};
