import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ImmobileDTO {
  titolo: string;
  indirizzo: string;
  prezzo: number;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // pagina corrente (0-based)
}

@Injectable({
  providedIn: 'root'
})
export class ImmobileService {
  private apiUrl = 'http://localhost:8080/utenti/paginati';

  constructor(private http: HttpClient) {}

  getImmobiliPaginati(page: number, size: number, sortBy: string, direction: string): Observable<Page<ImmobileDTO>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);

    return this.http.get<Page<ImmobileDTO>>(this.apiUrl, { params });
  }
}
