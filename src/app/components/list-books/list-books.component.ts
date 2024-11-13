import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IBook } from '../../interfaces/book.interface';
import { BibleService } from '../../services/bible.service';

@Component({
  selector: 'app-list-books',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list-books.component.html',
  styleUrl: './list-books.component.scss',
})
export class ListBooksComponent implements OnInit {
  bibleService = inject(BibleService);

  books = signal<IBook[]>([]);

  ngOnInit(): void {
    this.bibleService.getBooks().subscribe((resp) => {
      this.books.set(resp);
    });
  }
}
