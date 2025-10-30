import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthResponseDTO, AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  submitted = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)])
  });

  returnUrl: string = '/home';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.route.queryParams.subscribe(params => {
      if (params['returnUrl']) {
        this.returnUrl = params['returnUrl'];
      }
    });
  }

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

    this.authService.login(email, password).subscribe({
      next: (response: AuthResponseDTO | null) => {
        if (response) {
          console.log('Utente loggato con successo');
          this.authService.saveToken(response.token);

          this.router.navigate([this.returnUrl]);
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
