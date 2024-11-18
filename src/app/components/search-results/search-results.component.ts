import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISearchWord, IVerse } from '../../interfaces/book.interface';
import { HighlightPipe } from '../../pipes/highlight.pipe';
import { BibleService } from '../../services/bible.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, HighlightPipe],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit {
  actRoute = inject(ActivatedRoute);
  bibleService = inject(BibleService);

  searchResults = signal<ISearchWord>({} as ISearchWord);
  searchResultsLength = signal<number>(0);
  loading = signal<boolean>(false);

  ngOnInit(): void {
    this.actRoute.queryParams.subscribe((params) => {
      const word = params['palavra'];
      if (word) {
        this.loading.set(true);
        this.bibleService.searchByWord('nvi', word).subscribe({
          next: (resp) => {
            this.searchResultsLength.set(resp.verses.length);
            this.searchResults.set(this.filterResults(resp, word));
            this.loading.set(false);
          },
          error: () => {
            this.loading.set(false);
            console.error('Erro na busca.');
          },
        });
      }
    });
  }

  filterResults(resp: ISearchWord, searchTerm: string): ISearchWord {
    const filteredVerses = resp.verses.filter((verse) => {
      const regex = new RegExp(`\\b${searchTerm}\\b`, 'i');
      return regex.test(verse.text); // Verifica se o texto do versículo contém a palavra exata
    });
    return { ...resp, verses: filteredVerses };
  }

  get groupedResultsKeys(): string[] {
    return Object.keys(this.groupedResults);
  }

  get groupedResults(): Record<string, IVerse[]> {
    return this.searchResults().verses.reduce((acc, verse) => {
      const bookName = verse.book.name;
      acc[bookName] = acc[bookName] || [];
      acc[bookName].push(verse);
      return acc;
    }, {} as Record<string, IVerse[]>);
  }
}
