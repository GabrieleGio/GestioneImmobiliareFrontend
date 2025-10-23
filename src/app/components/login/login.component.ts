import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthResponseDTO, AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  submitted = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      console.log('Form non valido');
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        if (control?.invalid) {
          console.log(`Campo ${key} non valido:`, control.errors);
        }
      });
      return;
    }

    const { email, password } = this.loginForm.value;

    if (!email || !password) {
      console.error('Email o password mancante');
      return;
    }

    console.log('Invio dati al server:', { email, password });

    this.authService.login(email, password).subscribe({
      next: (response: AuthResponseDTO | null) => {
        if (response) {
          console.log('Utente loggato con successo', response);

          localStorage.setItem('authToken', response.token);  // Salvataggio del token

          alert('Login completato con successo!');
          this.router.navigate(['/home']);
        } else {
          alert('Errore nel login. Riprova.');
        }
      },
      error: (err) => {
        console.error('Errore durante il login', err);
        alert('Errore durante il login: ' + (err?.message || 'Errore sconosciuto'));
      }
    });
  }
}
