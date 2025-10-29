import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TrattativaPersonaleDTO {
    idTrattativa: number;
    idAnnuncio: number;
    prezzoOfferto: number;
    dataProposta: string;
    stato: string;
    messaggio: string;
}

export interface TrattativaDTO {
  idTrattativa: number;
  idUtente: number;
  idAnnuncio: number;
  prezzoOfferto: number;
  dataProposta: string;
  stato: string;
  messaggio: string;
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
export class TrattativaService {
  private apiUrl = 'http://localhost:8080/trattative/personali';
  private apiUrl2 = 'http://localhost:8080/trattative/annuncio'

  constructor(private http: HttpClient) {}

  getTrattative(
    page = 0,
    size = 10,
    sortBy = 'idTrattativa',
    direction: 'asc' | 'desc' = 'asc'
  ): Observable<PageResponse<TrattativaPersonaleDTO>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('direction', direction);

    return this.http.get<PageResponse<TrattativaPersonaleDTO>>(this.apiUrl, { params });
  }

  getTrattativePerAnnuncio(
    idAnnuncio: number,
    page = 0,
    size = 10,
    sortBy = 'idTrattativa',
    direction: 'asc' | 'desc' = 'asc'
  ): Observable<PageResponse<TrattativaDTO>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);

    return this.http.get<PageResponse<TrattativaDTO>>(
      `${this.apiUrl2}/${idAnnuncio}`,
      { params }
    );
  }
}
