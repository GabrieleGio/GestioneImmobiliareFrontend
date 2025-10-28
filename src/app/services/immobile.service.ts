import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ImmobilePersonaleDTO {
  idImmobile: number;
  titolo: string;
  descrizione: string;
  prezzo: number;
  tipologia: string;
  stato: string;
  superficie: number;
  indirizzo: string;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class ImmobileService {
  private apiUrl = 'http://localhost:8080/immobili/personali';

  constructor(private http: HttpClient) {}

  getImmobili(
    page = 0,
    size = 10,
    sortBy = 'idImmobile',
    direction: 'asc' | 'desc' = 'asc'
  ): Observable<PageResponse<ImmobilePersonaleDTO>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('direction', direction);

    return this.http.get<PageResponse<ImmobilePersonaleDTO>>(this.apiUrl, { params });
  }
}
