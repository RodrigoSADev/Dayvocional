import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/list-books/list-books.component').then(
        (c) => c.ListBooksComponent
      ),
  },
  {
    path: 'biblia/:id',
    loadComponent: () =>
      import('./components/book-detail/book-detail.component').then(
        (c) => c.BookDetailComponent
      ),
  },
  {
    path: 'biblia/:book/capitulo/:chapter',
    loadComponent: () =>
      import('./components/chapter-detail/chapter-detail.component').then(
        (c) => c.ChapterDetailComponent
      ),
  },
];
