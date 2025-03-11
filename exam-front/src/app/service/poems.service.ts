import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../common/category';
import { Poem } from '../common/poem';

@Injectable({
  providedIn: 'root'
})
export class PoemsService {

  private poemUrl = 'http://localhost:8080/api/poem';

  constructor(private httpClient: HttpClient) { }

  getPoems(): Observable<Poem[]> {
    return this.httpClient.get<Poem[]>(`${this.poemUrl}/all`)
      .pipe(catchError(this.handleError));
  }

  getPoemById(id: number): Observable<Poem> {
    return this.httpClient.get<Poem>(`${this.poemUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getPoemsByCategory(category: Category|string): Observable<Poem[]> {
    return this.httpClient.get<Poem[]>(`${this.poemUrl}/category/${category}`)
      .pipe(catchError(this.handleError));
  }

  createPoem(poem: Poem): Observable<Poem> {
    return this.httpClient.post<Poem>(`${this.poemUrl}/create`, poem)
      .pipe(catchError(this.handleError));
  }

  deletePoem(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.poemUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  likePoem(id: number): Observable<void> {
    return this.httpClient.post<void>(`${this.poemUrl}/${id}/like`, null)
      .pipe(catchError(this.handleError));
  }
  dislikePoem(id: number): Observable<void> {
    return this.httpClient.post<void>(`${this.poemUrl}/${id}/dislike`, null)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en el servicio de poemas:', error);
    return throwError(() => new Error('Hubo un error con la petición. Inténtalo nuevamente más tarde.'));
  }
  
}