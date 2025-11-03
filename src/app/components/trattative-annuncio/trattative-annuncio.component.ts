import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Per recuperare l'ID dalla route
import { TrattativaService, TrattativaDTO, PageResponse, TrattativaResponseDTO } from '../../services/trattativa.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-trattative-annuncio',
  standalone: true,
  imports: [CommonModule, TableModule, CardModule, ToolbarModule, RouterModule, NavbarComponent],
  templateUrl: './trattative-annuncio.component.html',
  styleUrls: ['./trattative-annuncio.component.scss'],
})
export class TrattativeAnnuncioComponent implements OnInit {
  idAnnuncio!: number;
  trattative: TrattativaDTO[] = [];
  totalPages = 0;
  currentPage = 0;
  pageSize = 10;
  sortBy = 'idTrattativa';
  direction: 'asc' | 'desc' = 'asc';

  constructor(
    private trattativaService: TrattativaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id && !isNaN(+id)) {
      this.idAnnuncio = +id;  // Converte l'ID in numero
      this.loadTrattative();
    } else {
      console.error('ID Annuncio non valido');
    }
  }

  loadTrattative(page: number = 0): void {
    if (!this.idAnnuncio || isNaN(this.idAnnuncio)) {
      console.error('ID Annuncio non valido');
      return;
    }

    this.trattativaService
      .getTrattativePerAnnuncio(this.idAnnuncio, page, this.pageSize, this.sortBy, this.direction)
      .subscribe({
        next: (data: PageResponse<TrattativaDTO>) => {
          this.trattative = data.content;
          this.totalPages = data.totalPages;
          this.currentPage = data.number;
        },
        error: (err) => console.error('Errore nel caricamento delle trattative:', err),
      });
  }

  accettaTrattativa(id: number): void {
    this.trattativaService.vendiTrattativa(id).subscribe({
      next: (response: TrattativaResponseDTO) => {
        alert(response.message);
        this.loadTrattative();
      },
      error: (err) => {
        console.error('Errore nel concludere la trattativa:', err);
        alert('Errore nel concludere la trattativa');
      },
    });
  }

  rifiutaTrattativa(id: number): void {
    // Aggiungere logica per rifutare trattativa
    console.log('Rifiutato idTrattativa:', id);
  }
  
  paginaPrecedente(): void {
    if (this.currentPage > 0) {
      this.loadTrattative(this.currentPage - 1);
    }
  }

  paginaSuccessiva(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.loadTrattative(this.currentPage + 1);
    }
  }
}
