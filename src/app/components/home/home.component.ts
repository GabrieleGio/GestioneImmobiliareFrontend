import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { AnnuncioService, AnnuncioHomeDTO, PageResponse } from '../../services/annuncio.service';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TableModule, CardModule, ToolbarModule, RouterModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  annunci: AnnuncioHomeDTO[] = [];
  totalPages = 0;
  currentPage = 0;
  pageSize = 10;

  constructor(private annuncioService: AnnuncioService) {}

  ngOnInit(): void {
    this.loadAnnunci();
  }

  loadAnnunci(page: number = 0): void {
    this.annuncioService.getAnnunci(page, this.pageSize, 'dataPubblicazione', 'desc')
      .subscribe({
        next: (data: PageResponse<AnnuncioHomeDTO>) => {
          // tolgo la possibilità di vedere gli annunci conclusi
          this.annunci = data.content.filter(annuncio => annuncio.visibile);
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
