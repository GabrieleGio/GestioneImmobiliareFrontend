import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  submitted = false;

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: passwordMatchValidator() });

  private apiUrl = 'http://localhost:8080/utenti/register';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.submitted = true;

    console.log('Form submitted');
    console.log('Form valid:', this.registerForm.valid);
    console.log('Form errors:', this.registerForm.errors);
    console.log('Form values:', this.registerForm.value);

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
    
    const registerData = {
      username: this.registerForm.get('username')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      confirmPassword: this.registerForm.get('confirmPassword')?.value,
    };

    console.log('Invio dati al server:', registerData);

    this.http.post(this.apiUrl, registerData).pipe(
      catchError((error) => {
        console.error('Errore durante la registrazione', error);
        alert('Errore durante la registrazione: ' + (error.error?.message || error.message));
        return of(null);
      })
    ).subscribe({
      next: (response) => {
        if (response) {
          console.log('Utente registrato con successo', response);
          alert('Registrazione completata con successo!');
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('Errore durante la registrazione', err);
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