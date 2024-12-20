import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { IVerseDetail } from '../../interfaces/bible.interface';
import { TitleTransformPipe } from '../../pipes/title-transform.pipe';
import { BibleService } from '../../services/bible.service';
import { ExplanationService } from '../../services/explanation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TitleTransformPipe, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  bibleService = inject(BibleService);
  explanationService = inject(ExplanationService);

  randomVerse = signal<IVerseDetail | null>(null);
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
    this.getRandomVerse();
  }

  getRandomVerse() {
    this.bibleService.getRandomVerse('nvi').subscribe((resp) => {
      this.randomVerse.set(resp);
      this.clearExplanation();
    });
  }

  onGenerateExplantion() {
    const prompt = `Explique o texto que está no livro de ${this.randomVerse()?.book.name.toString()} 
    capítulo ${this.randomVerse()?.chapter.toString()}, dentro da perspectiva reformada da 
    igreja presbiteriana, divida em três pontos: o contexto histórico, cultural e 
    literário em que está inserido, a explicação do capítulo e aplicações práticas. 
    Por favor, se atenha ao capítulo em questão, traga os pontos apenas do capítulo que foi pedido.
    Não precisa trazer nenhum tipo de introdução, traga os pontos que foram solicitados de forma direta e objetiva.`;
    this.explanationService.generateExplanation(prompt);
  }

  clearExplanation(): void {
    this.explanationService.clearExplanation();
  }
}
