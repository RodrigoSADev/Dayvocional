import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { of } from 'rxjs';
import {
  IBook,
  IChapterDetail,
  ISearchWord,
  IVerseDetail,
} from '../interfaces/bible.interface';
import { BibleService } from './bible.service';

describe('BibleService', () => {
  let service: BibleService;
  let httpClientSpy: { get: jest.Mock; post: jest.Mock };

  const API_URL = 'https://www.abibliadigital.com.br/api';
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHIiOiJUdWUgTm92IDEyIDIwMjQgMTk6MjM6NTMgR01UKzAwMDAucm9kcmlnb3NhbG1laWRhMTUwQGdtYWlsLmNvbSIsImlhdCI6MTczMTQzOTQzM30.V7ItAf24_zrXcDYLEZPy_pzoK-EcwgiNjWeLamrBlJw';

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
      post: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        BibleService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });

    service = TestBed.inject(BibleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch books', () => {
    const mockBooks: IBook[] = [
      {
        abbrev: {
          pt: 'gn',
          en: 'gn',
        },
        author: 'Moisés',
        chapters: 50,
        group: 'Pentateuco',
        name: 'Gênesis',
        testament: 'VT',
      },
      {
        abbrev: {
          pt: 'js',
          en: 'js',
        },
        author: 'Josué',
        chapters: 24,
        group: 'Históricos',
        name: 'Josué',
        testament: 'VT',
      },
      {
        abbrev: {
          pt: 'ef',
          en: 'eph',
        },
        author: 'Paulo',
        chapters: 6,
        group: 'Cartas',
        name: 'Efésios',
        testament: 'NT',
      },
    ];
    httpClientSpy.get.mockReturnValue(of(mockBooks));

    service.getBooks().subscribe((books) => {
      expect(books).toEqual(mockBooks);
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(`${API_URL}/books`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  });

  it('should fetch a book by abbreviation', () => {
    const mockBook: IBook = {
      abbrev: {
        pt: 'gn',
        en: 'gn',
      },
      author: 'Moisés',
      chapters: 50,
      group: 'Pentateuco',
      name: 'Gênesis',
      testament: 'VT',
    };
    httpClientSpy.get.mockReturnValue(of(mockBook));

    service.getBook('gn').subscribe((book) => {
      expect(book).toEqual(mockBook);
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(`${API_URL}/books/gn`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  });

  it('should fetch a chapter', () => {
    const mockChapter: IChapterDetail = {
      book: {
        abbrev: {
          pt: 'gn',
          en: 'gn',
        },
        name: 'Gênesis',
        author: 'Moisés',
        group: 'Pentateuco',
      },
      chapter: {
        number: 10,
        verses: 32,
      },
      verses: [
        {
          number: 1,
          text: 'Este é o registro da descendência de Sem, Cam e Jafé, filhos de Noé. Os filhos deles nasceram depois do Dilúvio.',
        },
      ],
    };
    httpClientSpy.get.mockReturnValue(of(mockChapter));

    service.getChapter('nvi', 'gn', '1').subscribe((chapter) => {
      expect(chapter).toEqual(mockChapter);
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${API_URL}/verses/nvi/gn/1`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  });

  it('should fetch a verse', () => {
    const mockVerse: IVerseDetail = {
      book: {
        abbrev: { pt: 'gn', en: 'gn' },
        author: 'Moisés',
        chapters: 50,
        group: 'Pentateuco',
        name: 'Gênesis',
        testament: 'VT',
      },
      chapter: 1,
      number: 1,
      text: 'No princípio, Deus criou os céus e a terra.',
    };
    httpClientSpy.get.mockReturnValue(of(mockVerse));

    service.getVerse('nvi', 'gn', 1, 1).subscribe((verse) => {
      expect(verse).toEqual(mockVerse);
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${API_URL}/verses/nvi/gn/1/1`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  });

  it('should fetch a random verse', () => {
    const mockVerse: IVerseDetail = {
      book: {
        abbrev: { pt: 'gn', en: 'gn' },
        author: 'Moisés',
        chapters: 50,
        group: 'Pentateuco',
        name: 'Gênesis',
        testament: 'VT',
      },
      chapter: 1,
      number: 1,
      text: 'No princípio, Deus criou os céus e a terra.',
    };
    httpClientSpy.get.mockReturnValue(of(mockVerse));

    service.getRandomVerse('nvi').subscribe((verse) => {
      expect(verse).toEqual(mockVerse);
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${API_URL}/verses/nvi/random`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  });

  it('should fetch a random verse from a book', () => {
    const mockVerse: IVerseDetail = {
      book: {
        abbrev: { pt: 'gn', en: 'gn' },
        author: 'Moisés',
        chapters: 50,
        group: 'Pentateuco',
        name: 'Gênesis',
        testament: 'VT',
      },
      chapter: 1,
      number: 1,
      text: 'No princípio, Deus criou os céus e a terra.',
    };
    httpClientSpy.get.mockReturnValue(of(mockVerse));

    service.getRandomVerseBook('nvi', 'gn').subscribe((verse) => {
      expect(verse).toEqual(mockVerse);
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${API_URL}/verses/nvi/gn/random`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  });

  it('should search by word', () => {
    const mockSearchResult: ISearchWord = {
      occurrence: 31,
      version: 'nvi',
      verses: [
        {
          book: {
            abbrev: {
              pt: 'ex',
              en: 'ex',
            },
            author: 'Moisés',
            chapters: 40,
            group: 'Pentateuco',
            name: 'Êxodo',
            testament: 'VT',
          },
          chapter: 7,
          number: 9,
          text: '"Quando o faraó lhes pedir que façam algum milagre, diga a Arão que tome a sua vara e a jogue diante do faraó; e ela se transformará numa serpente".',
        },
      ],
    };
    httpClientSpy.post.mockReturnValue(of(mockSearchResult));

    service.searchByWord('nvi', 'love').subscribe((result) => {
      expect(result).toEqual(mockSearchResult);
    });

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      `${API_URL}/verses/search`,
      {
        version: 'nvi',
        search: 'love',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  });
});
