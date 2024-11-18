import { Component, inject, OnInit, signal } from '@angular/core';
import { IVerseDetail } from '../../interfaces/book.interface';
import { BibleService } from '../../services/bible.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  bibleService = inject(BibleService);

  randomVerse = signal<IVerseDetail | null>(null);
  randomVerseBook = signal<IVerseDetail | null>(null);
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
    this.bibleService.getRandomVerse('nvi').subscribe((resp) => {
      this.randomVerse.set(resp);
    });
    this.getRandomVerseAleatoryBook();
  }

  getRandomVerseAleatoryBook() {
    this.bibleService
      .getRandomVerseBook(
        'nvi',
        this.books()[Math.floor(Math.random() * this.books().length)]
      )
      .subscribe((resp) => {
        this.randomVerseBook.set(resp);
      });
  }
}
