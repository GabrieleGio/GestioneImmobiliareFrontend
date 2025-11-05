import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ImmobileDTO, ImmobileService } from '../../services/immobile.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { StatoImmobile, Tipologia } from '../../enums/immobile.enum';

@Component({
  selector: 'app-aggiungi-immobile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './aggiungi-immobile.component.html',
})
export class AggiungiImmobileComponent {
  immobileForm: FormGroup;

  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  Tipologia = Tipologia;
  StatoImmobile = StatoImmobile;

  tipologie = Object.values(Tipologia);
  stati = Object.values(StatoImmobile); 
  
  constructor(
    private fb: FormBuilder,
    private immobileService: ImmobileService,
    private router: Router
  ) {
    this.immobileForm = this.fb.group({
      titolo: ['', [Validators.required, Validators.maxLength(255)]],
      descrizione: ['', [Validators.required, Validators.maxLength(255)]],
      prezzo: [0, [Validators.required, Validators.min(1), Validators.max(999999999.99)]],
      tipologia: ['', Validators.required],
      stato: ['', Validators.required],
      superficie: [0, [Validators.required, Validators.min(1), Validators.max(999999)]],
      indirizzo: ['', [Validators.required, Validators.max(255)]],
    });
  }

  onSubmit(): void {
  if (this.immobileForm.invalid) {
    this.immobileForm.markAllAsTouched();
    return;
  }

  this.isSubmitting = true;

  //Omit serve per escludere le proprietà che non voglo inviare al backend
  const nuovoImmobile = this.immobileForm.value as Omit<ImmobileDTO, 'idImmobile' | 'proprietarioId'>;
  console.log('DEBUG');
  console.log(nuovoImmobile.indirizzo);
  this.immobileService.aggiungiImmobile(nuovoImmobile).subscribe({
    next: () => {
      this.successMessage = 'Immobile aggiunto con successo!';
      this.isSubmitting = false;
      this.router.navigate(['/immobili']);
    },
    error: () => {
      this.errorMessage = 'Errore durante il salvataggio. Riprova.';
      this.isSubmitting = false;
    },
  });
}

}
