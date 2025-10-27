import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { ImmobilePersonaleDTO, ImmobileService, PageResponse } from '../../services/immobile.service';

@Component({
  selector: 'app-immobili',
  standalone: true,
  imports: [CommonModule, TableModule, CardModule, ToolbarModule, RouterModule, NavbarComponent],
  templateUrl: './immobili.component.html',
  styleUrls: ['./immobili.component.scss']
})
export class ImmobiliComponent implements OnInit {
  immobili: ImmobilePersonaleDTO[] = [];
  totalPages = 0;
  currentPage = 0;
  pageSize = 10;

  constructor(private immobileService: ImmobileService) {}

  ngOnInit(): void {
    this.loadImmobili();
  }

  loadImmobili(page: number = 0): void {
    this.immobileService.getImmobili(page, this.pageSize)
      .subscribe({
        next: (data: PageResponse<ImmobilePersonaleDTO>) => {
          this.immobili = data.content;
          this.totalPages = data.totalPages;
          this.currentPage = data.number;
        },
        error: (err) => console.error('Errore nel caricamento degli immobili:', err)
      });
  }

  paginaPrecedente(): void {
    if (this.currentPage > 0) {
      this.loadImmobili(this.currentPage - 1);
    }
  }

  paginaSuccessiva(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.loadImmobili(this.currentPage + 1);
    }
  }
}
