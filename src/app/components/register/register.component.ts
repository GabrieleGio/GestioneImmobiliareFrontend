import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  submitted = false;

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: passwordMatchValidator() });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      console.log('Form non valido');
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control?.invalid) {
          console.log(`Campo ${key} non valido:`, control.errors);
        }
      });
      return;
    }
    
    const formValues = this.registerForm.value;
    const username = formValues.username ?? '';
    const email = formValues.email ?? '';
    const password = formValues.password ?? '';
    const confirmPassword = formValues.confirmPassword ?? '';

    console.log('Invio dati al server per registrazione:', { username, email, password, confirmPassword });

    this.authService.register(username, email, password, confirmPassword).subscribe({
      next: (response) => {
        if (response) {
          console.log('Utente registrato con successo', response);
          alert('Registrazione completata con successo!');
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('Errore durante la registrazione', err);
        alert('Errore durante la registrazione: ' + (err?.message || 'Errore sconosciuto'));
      }
    });
  }
}

export function passwordMatchValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    
    return null;
  }
}
