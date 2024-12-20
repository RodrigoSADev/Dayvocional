import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IChapterDetail } from '../../interfaces/bible.interface';
import { TitleTransformPipe } from '../../pipes/title-transform.pipe';
import { BibleService } from '../../services/bible.service';
import { ExplanationService } from '../../services/explanation.service';

@Component({
  selector: 'app-chapter-detail',
  standalone: true,
  imports: [RouterLink, TitleTransformPipe],
  templateUrl: './chapter-detail.component.html',
  styleUrl: './chapter-detail.component.scss',
})
export class ChapterDetailComponent implements OnInit {
  bibleService = inject(BibleService);
  explanationService = inject(ExplanationService);
  actRoute = inject(ActivatedRoute);
  router = inject(Router);

  chapter = signal<IChapterDetail | null>(null);
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
    '1rs',
    '2rs',
    '1cr',
    '2cr',
    'ed',
    'ne',
    'et',
    'job',
    'sl',
    'pv',
    'ec',
    'ct',
    'is',
    'jr',
    'lm',
    'ez',
    'dn',
    'os',
    'jl',
    'am',
    'ob',
    'jn',
    'mq',
    'na',
    'hc',
    'sf',
    'ag',
    'zc',
    'ml',
    'mt',
    'mc',
    'lc',
    'jo',
    'at',
    'rm',
    '1co',
    '2co',
    'gl',
    'ef',
    'fp',
    'cl',
    '1ts',
    '2ts',
    '1tm',
    '2tm',
    'tt',
    'fm',
    'hb',
    'tg',
    '1pe',
    '2pe',
    '1jo',
    '2jo',
    '3jo',
    'jd',
    'ap',
  ]);

  ngOnInit(): void {
    this.loadChapter();
    this.clearExplanation();
  }

  loadChapter(): void {
    const book = this.actRoute.snapshot.paramMap.get('book')!;
    const chapter = this.actRoute.snapshot.paramMap.get('chapter')!;
    this.bibleService.getChapter('nvi', book, chapter).subscribe((resp) => {
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
          this.router.navigate(['biblia', nextBook, 'capitulo', 1]).then(() => {
            this.loadChapter();
            this.scrollToTop();
          });
      } else if (direction === 'previous' && chapter < 1) {
        const prevBook = this.getPreviousBook(book);
        if (prevBook) {
          this.bibleService.getBook(prevBook).subscribe((prevBookData) => {
            const prevTotalChapters = prevBookData.chapters;
            this.router
              .navigate(['biblia', prevBook, 'capitulo', prevTotalChapters])
              .then(() => {
                this.loadChapter();
                this.scrollToTop();
              });
          });
        }
      } else {
        this.router.navigate(['biblia', book, 'capitulo', chapter]).then(() => {
          this.loadChapter();
          this.scrollToTop();
        });
      }
    });
  }

  onNextChapter(): void {
    this.clearExplanation();
    const book = this.actRoute.snapshot.paramMap.get('book')!;
    const currentChapter = +this.actRoute.snapshot.paramMap.get('chapter')!;
    this.navigateToChapter(book, currentChapter + 1, 'next');
  }

  onPreviousChapter(): void {
    this.clearExplanation();
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

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onGenerateExplantion(): void {
    const prompt = `Explique o capítulo ${this.chapter()?.chapter.number.toString()} do livro ${this.chapter()?.book.name?.toString()} 
    dentro da perspectiva reformada, considerando os princípios da teologia presbiteriana. divida em três pontos: 
    o contexto histórico, cultural e literário em que está inserido, a explicação do capítulo e aplicações práticas. 
    Por favor, se atenha ao capítulo em questão, traga os pontos apenas do capítulo que foi pedido.
    Não precisa trazer nenhum tipo de introdução, traga os pontos que foram solicitados de forma direta e objetiva.`;
    this.explanationService.generateExplanation(prompt);
  }

  clearExplanation(): void {
    this.explanationService.clearExplanation();
  }
}
