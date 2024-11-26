import { Component, inject, OnInit, signal } from '@angular/core';
import { IVerseDetail } from '../../interfaces/bible.interface';
import { TitleTransformPipe } from '../../pipes/title-transform.pipe';
import { BibleService } from '../../services/bible.service';
import { GeminiService } from '../../services/gemini.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TitleTransformPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  bibleService = inject(BibleService);
  geminiService = inject(GeminiService);

  randomVerse = signal<IVerseDetail | null>(null);
  randomVerseAleatoryBook = signal<IVerseDetail | null>(null);
  explanationVerse = signal<string | null>(null);
  explanationLoading = signal(false);
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
    });
  }

  onGenerateExplantion() {
    this.explanationLoading.set(true);
    this
      .getAiResponse(`Explique o versículo ${this.randomVerse()?.book.name.toString()} 
    ${this.randomVerse()?.chapter.toString()}:${this.randomVerse()?.number.toString()}, 
    divida em pontos: primeiro ponto o contexto do momento em que foi escrito o versículo, 
    segundo ponto o significado do versículo, 
    terceiro ponto a aplicação do versículo na vida do cristão.
    Não precisa trazer o versiculo, apenas a explicação.`);
  }

  getAiResponse(prompt: string): void {
    this.geminiService.sendPrompt(prompt).subscribe({
      next: (resp) => {
        this.explanationVerse.set(resp.text);
        this.explanationLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao obter resposta da IA:', err);
      },
    });
  }
}
