import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { AddBookComponent } from './components/add-book/add-book.component';

export const routes: Routes = [
  {
    path: '',
    component: BookListComponent,
  },
  {
    path: 'book/:isbn',
    component: BookDetailComponent,
  },
  {
    path: 'add',
    component: AddBookComponent,
  },
];
