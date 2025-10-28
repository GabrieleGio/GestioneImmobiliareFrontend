import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { AnnuncioPersonaleDTO, AnnuncioService, PageResponse } from '../../services/annuncio.service';

@Component({
  selector: 'app-annunci',
  imports: [CommonModule, TableModule, CardModule, ToolbarModule, RouterModule, NavbarComponent],
  templateUrl: './annunci.component.html',
  styleUrl: './annunci.component.scss'
})

export class AnnunciComponent {
    annunci: AnnuncioPersonaleDTO[] = [];
    totalPages = 0;
    currentPage = 0;
    pageSize = 10;
  
    constructor(private annuncioService: AnnuncioService) {}
  
    ngOnInit(): void {
      this.loadAnnunci();
    }
  
    loadAnnunci(page: number = 0): void {
      this.annuncioService.getAnnunciPersonali(page, this.pageSize, 'dataPubblicazione', 'desc')
        .subscribe({
          next: (data: PageResponse<AnnuncioPersonaleDTO>) => {
            this.annunci = data.content;
            this.totalPages = data.totalPages;
            this.currentPage = data.number;
          },
          error: (err) => console.error('Errore nel caricamento annunci:', err)
        });
    }
  
    paginaPrecedente(): void {
      if (this.currentPage > 0) {
        this.loadAnnunci(this.currentPage - 1);
      }
    }
  
    paginaSuccessiva(): void {
      if (this.currentPage < this.totalPages - 1) {
        this.loadAnnunci(this.currentPage + 1);
      }
    }
}
