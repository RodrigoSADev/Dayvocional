import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IBook } from '../../interfaces/bible.interface';
import { BibleService } from '../../services/bible.service';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
})
export class BookDetailComponent implements OnInit {
  bibleService = inject(BibleService);
  actRoute = inject(ActivatedRoute);

  book = signal<IBook>({} as IBook);
  chapters = signal<number[]>([]);

  ngOnInit(): void {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.bibleService.getBook(id).subscribe((resp) => {
      this.book.set(resp);
      this.chapters.set(Array.from({ length: resp.chapters }, (_, i) => i + 1));
    });
  }
}
