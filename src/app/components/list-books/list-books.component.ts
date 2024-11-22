import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IBook } from '../../interfaces/bible.interface';
import { BibleService } from '../../services/bible.service';

@Component({
  selector: 'app-list-books',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './list-books.component.html',
  styleUrl: './list-books.component.scss',
})
export class ListBooksComponent implements OnInit {
  bibleService = inject(BibleService);

  books = signal<IBook[]>([]);
  groupedBooks = signal<{ name: string; books: IBook[] }[]>([]);

  ngOnInit(): void {
    this.bibleService.getBooks().subscribe((resp) => {
      this.books.set(resp);
      this.groupBooksByGroup();
    });
  }

  groupBooksByGroup(): void {
    const grouped = this.books().reduce((acc, book) => {
      const groupName = this.capitalizeWords(book.group);
      let group = acc.find((group) => group.name === groupName);
      if (!group) {
        group = { name: groupName, books: [] };
        acc.push(group);
      }
      group.books.push(book);
      return acc;
    }, [] as { name: string; books: IBook[] }[]);

    this.groupedBooks.set(grouped);
  }

  capitalizeWords(text: string): string {
    return text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
