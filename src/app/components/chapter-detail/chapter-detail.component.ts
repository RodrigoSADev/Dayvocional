import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IChapterDetail } from '../../interfaces/book.interface';
import { BibleService } from '../../services/bible.service';

@Component({
  selector: 'app-chapter-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './chapter-detail.component.html',
  styleUrl: './chapter-detail.component.scss',
})
export class ChapterDetailComponent implements OnInit {
  bibleService = inject(BibleService);
  actRoute = inject(ActivatedRoute);
  router = inject(Router);

  chapter = signal<IChapterDetail>({} as IChapterDetail);
  isFirstChapter = signal<boolean>(false);
  isLastChapter = signal<boolean>(false);
  books = signal([
    'gn',
    'ex',
    'lv',
    'nm',
    'dt',
    'js',
    'jz',
    'rt',
    '1sm',
    '2sm',
  ]);
  chapterBook = signal<string>('');
  chapterNumber = signal<number>(0);

  ngOnInit(): void {
    this.loadChapter();
  }

  loadChapter(): void {
    const book = this.actRoute.snapshot.paramMap.get('book')!;
    const chapter = this.actRoute.snapshot.paramMap.get('chapter')!;
    this.bibleService.getChapter('nvi', book, chapter).subscribe((resp) => {
      this.chapterBook.set(resp.book.name);
      this.chapterNumber.set(+chapter);
      this.chapter.set(resp);
      this.updateNavigationState(book, +chapter);
    });
  }

  updateNavigationState(book: string, chapter: number): void {
    this.isFirstChapter.set(book === 'gn' && chapter === 1);
    this.isLastChapter.set(book === 'ap' && chapter === 22);
  }

  navigateToChapter(
    book: string,
    chapter: number,
    direction: 'next' | 'previous'
  ): void {
    this.bibleService.getBook(book).subscribe((bookData) => {
      const totalChapters = bookData.chapters;

      if (direction === 'next' && chapter > totalChapters) {
        const nextBook = this.getNextBook(book);
        if (nextBook)
          this.router
            .navigate(['biblia', nextBook, 'capitulo', 1])
            .then(() => this.loadChapter());
      } else if (direction === 'previous' && chapter < 1) {
        const prevBook = this.getPreviousBook(book);
        if (prevBook) {
          this.bibleService.getBook(prevBook).subscribe((prevBookData) => {
            const prevTotalChapters = prevBookData.chapters;
            this.router
              .navigate(['biblia', prevBook, 'capitulo', prevTotalChapters])
              .then(() => this.loadChapter());
          });
        }
      } else {
        this.router
          .navigate(['biblia', book, 'capitulo', chapter])
          .then(() => this.loadChapter());
      }
    });
  }

  onNextChapter(): void {
    const book = this.actRoute.snapshot.paramMap.get('book')!;
    const currentChapter = +this.actRoute.snapshot.paramMap.get('chapter')!;
    this.navigateToChapter(book, currentChapter + 1, 'next');
  }

  onPreviousChapter(): void {
    const book = this.actRoute.snapshot.paramMap.get('book')!;
    const currentChapter = +this.actRoute.snapshot.paramMap.get('chapter')!;
    this.navigateToChapter(book, currentChapter - 1, 'previous');
  }

  getNextBook(currentBook: string): string | null {
    const currentIndex = this.books().indexOf(currentBook);
    return currentIndex >= 0 && currentIndex < this.books().length - 1
      ? this.books()[currentIndex + 1]
      : null;
  }

  getPreviousBook(currentBook: string): string | null {
    const currentIndex = this.books().indexOf(currentBook);
    return currentIndex > 0 ? this.books()[currentIndex - 1] : null;
  }
}
