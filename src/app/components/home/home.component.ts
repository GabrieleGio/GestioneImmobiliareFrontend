import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { AnnuncioService, AnnuncioHome } from '../../services/annuncio.service';
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
  annunci: AnnuncioHome[] = [];

  constructor(private annuncioService: AnnuncioService) {}

  ngOnInit(): void {
    this.annuncioService.getAnnunci().subscribe({
      next: (data) => this.annunci = data.content,
      error: (err) => console.error('Errore nel caricamento annunci:', err)
    });
  }
}
