import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { IBook } from '../../models/book.model';
import { Router } from '@angular/router';
import { title } from 'process';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
})
export class AddBookComponent {
  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {
    this.bookForm = this.createBookForm();
  }

  onSubmit(): void {
    const newBook: IBook = {
      title: {
        text: this.bookForm.value.titleText,
        lang: this.bookForm.value.titleLang,
      },
      authors: this.bookForm.value.authors?.split('\n'),
      category: this.bookForm.value.category,
      cover: this.bookForm.value.cover,
      isbn: this.bookForm.value.isbn,
      price: this.bookForm.value.price,
      year: this.bookForm.value.year,
    };

    this.bookService.addBook(newBook).subscribe({
      next: (book: IBook) => {
        this.router.navigate(['/book', book.isbn]);
      },
      error: (err: any) => {
        console.error('Error adding book:', err);
      },
    });
  }

  createBookForm(): FormGroup {
    return (this.bookForm = this.fb.group({
      isbn: '',
      titleText: '',
      titleLang: '',
      authors: [],
      category: '',
      cover: '',
      year: null,
      price: null,
    }));
  }
}
