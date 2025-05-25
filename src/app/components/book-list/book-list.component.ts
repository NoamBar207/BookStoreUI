import { Component, OnInit } from '@angular/core';
import { IBook } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent implements OnInit {
  books: IBook[] = [];
  loading: boolean = true;

  constructor(
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch books:', err);
        this.loading = false;
      },
    });
  }

  downLoadReport() {
    this.bookService.getHtmlReport().subscribe((report) => {
      const blob = new Blob([report], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.html';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  openReportInNewTab() {
    this.bookService.getHtmlReport().subscribe((report) => {
      const blob = new Blob([report], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      window.URL.revokeObjectURL(url);
    });
  }

  onAddBook() {
    this.router.navigate(['/add']);
  }
}
