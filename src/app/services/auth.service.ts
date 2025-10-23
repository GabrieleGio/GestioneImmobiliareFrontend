import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { of } from 'rxjs';

export interface AuthResponseDTO {
  token: string;
  type: string;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrlLogin = 'http://localhost:8080/utenti/login';
  private apiUrlRegister = 'http://localhost:8080/utenti/register';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const loginData = { email, password };

    return this.http.post<AuthResponseDTO>(this.apiUrlLogin, loginData).pipe(
      catchError((error) => {
        console.error('Errore durante il login', error);
        return of(null);
      })
    );
  }

  register(username: string, email: string, password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      console.error('Le password non corrispondono');
      return of(null);
    }

    const registerData = { username, email, password, confirmPassword };

    return this.http.post(this.apiUrlRegister, registerData).pipe(
      catchError((error) => {
        console.error('Errore durante la registrazione', error);
        return of(null);
      })
    );
  }
}
