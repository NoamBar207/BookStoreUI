import { Component, OnInit } from '@angular/core';
import { IBook } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
})
export class BookDetailComponent implements OnInit {
  book: IBook | null = null;
  loading = true;
  bookForm!: FormGroup;
  enableEdit = false;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const isbn = this.route.snapshot.paramMap.get('isbn');
    if (isbn) {
      this.bookService.getBookByIsbn(isbn).subscribe({
        next: (book: IBook) => {
          this.book = book;
          this.loading = false;
          this.bookForm = this.createBookForm();
        },
        error: (err: any) => {
          console.error('Error fetching book:', err);
          this.loading = false;
        },
      });
    }
  }

  deleteBook(): void {
    if (confirm('Are you sure you want to delete this book?') && this.book) {
      this.bookService.deleteBook(this.book.isbn).subscribe({
        next: () => {
          this.book = null;
          this.router.navigate(['/']);
        },
        error: (err: any) => {
          console.error('Error deleting book:', err);
        },
      });
    }
  }

  onSubmit(): void {
    const updateBook: IBook = {
      title: {
        text: this.bookForm.value.titleText,
        lang: this.bookForm.value.titleLang,
      },
      authors: this.bookForm.value.authors.split('\n'),
      category: this.bookForm.value.category,
      cover: this.bookForm.value.cover,
      isbn: this.book!.isbn,
      price: this.bookForm.value.price,
      year: this.bookForm.value.year,
    };

    this.bookService.updateBook(this.book!.isbn, updateBook).subscribe({
      next: (updatedBook: IBook) => {
        this.book = updatedBook;
        this.enableEdit = false;
        this.ngOnInit();
      },
      error: (err: any) => {
        console.error('Error updating book:', err);
      },
    });
  }

  cancelEdit(): void {
    this.enableEdit = false;
    this.ngOnInit();
  }

  createBookForm(): FormGroup {
    return (this.bookForm = this.fb.group({
      titleText: this.book?.title.text,
      titleLang: this.book?.title.lang,
      authors: this.book?.authors.join('\n'),
      category: this.book?.category,
      cover: this.book?.cover,
      year: this.book?.year,
      price: this.book?.price,
    }));
  }
}
