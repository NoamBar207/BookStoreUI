import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from '../models/book.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = `${environment.apiUrl}api/books`;
  private reportUrl = `${environment.apiUrl}report`;

  constructor(private http: HttpClient) {}

  getBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.apiUrl);
  }

  getBookByIsbn(isbn: string): Observable<IBook> {
    return this.http.get<IBook>(`${this.apiUrl}/${isbn}`);
  }

  deleteBook(isbn: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${isbn}`);
  }

  updateBook(isbn: string, updatedBook: IBook): Observable<IBook> {
    return this.http.put<IBook>(`${this.apiUrl}/${updatedBook.isbn}`, updatedBook);
  }

  addBook(newBook: IBook): Observable<IBook> {
    return this.http.post<IBook>(this.apiUrl, newBook);
  }

  getHtmlReport(): Observable<string> {
    return this.http.get(this.reportUrl, { responseType: 'text' });
  }
}
