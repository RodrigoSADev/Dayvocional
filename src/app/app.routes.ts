import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inicio',
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./components/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'biblia',
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
  {
    path: 'busca',
    loadComponent: () =>
      import('./components/search-results/search-results.component').then(
        (c) => c.SearchResultsComponent
      ),
  },
];
