import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AnnuncioHomeDTO {
  idAnnuncio: number;
  dataPubblicazione: string;
  visibile: boolean;
  visualizzazioni: number;
  idImmobile: number;
  titoloImmobile: string;
  indirizzo: string;
  prezzo: number;
}

export interface AnnuncioPersonaleDTO {
  idAnnuncio: number;
  dataPubblicazione: string;
  visibile: boolean;
  visualizzazioni: number;
  idImmobile: number;
  titoloImmobile: string;
  indirizzo: string;
  prezzo: number;
  idVenditore: number;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

@Injectable({ providedIn: 'root' })
export class AnnuncioService {
  private apiUrl = 'http://localhost:8080/annunci/paginate';
  private apiUrl2 = 'http://localhost:8080/annunci/personali';

  constructor(private http: HttpClient) {}

  getAnnunci(
    page = 0,
    size = 10,
    sortBy = 'idAnnuncio',
    direction: 'asc' | 'desc' = 'asc'
  ): Observable<PageResponse<AnnuncioHomeDTO>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('direction', direction);

    return this.http.get<PageResponse<AnnuncioHomeDTO>>(this.apiUrl, { params });
  }
  
  getAnnunciPersonali(
    page = 0,
    size = 10,
    sortBy = 'idAnnuncio',
    direction: 'asc' | 'desc' = 'asc'
  ): Observable<PageResponse<AnnuncioPersonaleDTO>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('direction', direction);
    
      return this.http.get<PageResponse<AnnuncioPersonaleDTO>>(this.apiUrl2, {params});
  }
}
