import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISearchWord, IVerse } from '../../interfaces/book.interface';
import { BibleService } from '../../services/bible.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit {
  actRoute = inject(ActivatedRoute);
  bibleService = inject(BibleService);

  searchResults = signal<ISearchWord>({} as ISearchWord);
  loading = signal<boolean>(false);

  ngOnInit(): void {
    this.actRoute.queryParams.subscribe((params) => {
      const word = params['palavra'];
      if (word) {
        this.loading.set(true);
        this.bibleService.searchByWord('nvi', word).subscribe({
          next: (resp) => {
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

  objectKeys(obj: Record<string, IVerse[]>): string[] {
    return Object.keys(obj);
  }

  get groupedResults(): Record<string, IVerse[]> {
    return this.searchResults().verses.reduce(
      (acc: Record<string, IVerse[]>, verse: IVerse) => {
        const bookName = verse.book.name;
        if (!acc[bookName]) {
          acc[bookName] = [];
        }
        acc[bookName].push(verse);
        return acc;
      },
      {}
    );
  }
}
