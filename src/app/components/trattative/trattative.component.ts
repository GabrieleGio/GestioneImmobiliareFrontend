import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { PageResponse, TrattativaPersonaleDTO, TrattativaService } from '../../services/trattativa.service';

@Component({
  selector: 'app-trattative',
  standalone: true,
  imports: [CommonModule, TableModule, CardModule, ToolbarModule, RouterModule, NavbarComponent],
  templateUrl: './trattative.component.html',
  styleUrl: './trattative.component.scss'
})
export class TrattativeComponent {
  trattative: TrattativaPersonaleDTO[] = [];
  totalPages = 0;
  currentPage = 0;
  pageSize = 10;

  constructor(private trattativaService: TrattativaService) {}

  ngOnInit(): void{
    this.loadTrattative();
  }

  loadTrattative(page: number = 0): void {
      this.trattativaService.getTrattative(page, this.pageSize)
        .subscribe({
          next: (data: PageResponse<TrattativaPersonaleDTO>) => {
            this.trattative = data.content;
            this.totalPages = data.totalPages || 1;
            this.currentPage = data.number;
          },
          error: (err) => console.error('Errore nel caricamento delle trattative:', err)
        });
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
