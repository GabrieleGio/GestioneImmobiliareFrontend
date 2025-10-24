import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AnnuncioHome {
  idAnnuncio: number;
  dataPubblicazione: string;
  visibile: boolean;
  visualizzazioni: number;
  idImmobile: number;
  titoloImmobile: string;
  indirizzo: string;
  prezzo: number;
}

@Injectable({ providedIn: 'root' })
export class AnnuncioService {
  private apiUrl = 'http://localhost:8080/annunci/paginati';

  constructor(private http: HttpClient) {}

  getAnnunci(page = 0, size = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&size=${size}`);
  }
}
