import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dettaglio-annuncio',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './dettaglio-annuncio.component.html',
  styleUrls: ['./dettaglio-annuncio.component.scss']
})
export class DettaglioAnnuncioComponent implements OnInit {
  annuncio: any;
  apiUrl = 'http://localhost:8080';
  showForm = false;
  propostaForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`${this.apiUrl}/annunci/${id}`).subscribe((res: any) => {
      this.annuncio = res;
      this.http.get(`${this.apiUrl}/immobili/${res.idImmobile}`)
        .subscribe((immobile: any) => this.annuncio.immobile = immobile);
    });

    this.propostaForm = this.fb.group({
      prezzoOfferto: ['', [Validators.required, Validators.min(1)]],
      messaggio: ['']
    });
  }

  apriForm() {
    this.showForm = true;
  }

  inviaProposta() {
    if (this.propostaForm.invalid) return;

    const proposta = {
      idAnnuncio: this.annuncio.idAnnuncio,
      prezzoOfferto: this.propostaForm.value.prezzoOfferto,
      messaggio: this.propostaForm.value.messaggio || ''
    };

    this.http.post(`${this.apiUrl}/trattative`, proposta)
      .pipe(
        catchError(err => {
          alert('Errore durante l’invio della proposta.');
          console.error(err);
          return of(null);
        })
      )
      .subscribe(res => {
        if (res) {
          alert('Proposta inviata con successo!');
          this.showForm = false;
          this.propostaForm.reset();
        }
      });
  }
}
