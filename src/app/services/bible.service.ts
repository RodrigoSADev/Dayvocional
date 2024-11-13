import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IBook,
  IChapterDetail,
  ISearchWord,
  IVerseDetail,
} from '../interfaces/book.interface';

@Injectable({
  providedIn: 'root',
})
export class BibleService {
  http = inject(HttpClient);

  private API_URL = 'https://www.abibliadigital.com.br/api';
  private token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHIiOiJUdWUgTm92IDEyIDIwMjQgMTk6MjM6NTMgR01UKzAwMDAucm9kcmlnb3NhbG1laWRhMTUwQGdtYWlsLmNvbSIsImlhdCI6MTczMTQzOTQzM30.V7ItAf24_zrXcDYLEZPy_pzoK-EcwgiNjWeLamrBlJw';

  getBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(`${this.API_URL}/books`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  getBook(abbrev: string | null): Observable<IBook> {
    return this.http.get<IBook>(`${this.API_URL}/books/${abbrev}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  getChapter(
    version: string,
    abbrev: string | null,
    chapter: string | null
  ): Observable<IChapterDetail> {
    return this.http.get<IChapterDetail>(
      `${this.API_URL}/verses/${version}/${abbrev}/${chapter}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  getVerse(
    version: string,
    abbrev: string,
    chapter: number,
    verse: number
  ): Observable<IVerseDetail> {
    return this.http.get<IVerseDetail>(
      `${this.API_URL}/verses/${version}/${abbrev}/${chapter}/${verse}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  getRandomVerse(version: string): Observable<IVerseDetail> {
    return this.http.get<IVerseDetail>(
      `${this.API_URL}/verses/${version}/random`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  getRandomVerseBook(version: string, book: string): Observable<IVerseDetail> {
    return this.http.get<IVerseDetail>(
      `${this.API_URL}/verses/${version}/${book}/random`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  searchByWord(version: string, search: string): Observable<ISearchWord> {
    return this.http.post<ISearchWord>(
      `${this.API_URL}/verses/search`,
      {
        version,
        search,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }
}
