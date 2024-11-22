import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ISearchWord } from '../../interfaces/bible.interface';
import { BibleService } from '../../services/bible.service';
import { SearchResultsComponent } from './search-results.component';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let bibleServiceMock: jest.Mocked<BibleService>;
  let activatedRouteMock: Partial<ActivatedRoute>;
  let fixture: ComponentFixture<SearchResultsComponent>;

  const mockResponse: ISearchWord = {
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

  beforeEach(() => {
    activatedRouteMock = {
      queryParams: of({ palavra: 'milagre' }),
    };

    bibleServiceMock = {
      searchByWord: jest.fn(),
    } as unknown as jest.Mocked<BibleService>;

    TestBed.configureTestingModule({
      imports: [SearchResultsComponent],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: BibleService, useValue: bibleServiceMock },
      ],
    });

    fixture = TestBed.createComponent(SearchResultsComponent);
    component = TestBed.createComponent(
      SearchResultsComponent
    ).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading spinner when loading', () => {
    component.loading.set(true);
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const spinner = element.querySelector('.spinner-container');

    expect(spinner).toBeTruthy();
  });

  it('deve buscar a palavra e atualizar os resultados ao inicializar', () => {
    bibleServiceMock.searchByWord.mockReturnValue(of(mockResponse));

    component.ngOnInit();

    expect(bibleServiceMock.searchByWord).toHaveBeenCalledWith(
      'nvi',
      'milagre'
    );
    expect(component.loading()).toBe(false);
    expect(component.searchResultsLength()).toBe(1);
    expect(component.searchResults()).toEqual(mockResponse);
  });

  it('deve filtrar resultados corretamente', () => {
    const filterResponse: ISearchWord = {
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
          text: '"E não pôde fazer ali nenhum milagre, exceto impor as mãos sobre alguns doentes e curá-los.".',
        },
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
          text: '"Texto sem relação.".',
        },
      ],
    };

    component.searchResults.set(filterResponse);

    const filtered = component.filterResults(filterResponse, 'milagre');

    expect(filtered.verses).toEqual(filterResponse.verses.slice(0, 2));
  });

  it('deve agrupar os resultados corretamente', () => {
    component.searchResults.set(mockResponse);

    const grouped = component.groupedResults;

    expect(grouped).toEqual({ Êxodo: [mockResponse.verses[0]] });

    expect(component.groupedResultsKeys).toEqual(['Êxodo']);
  });

  it('deve lidar com erro na busca', () => {
    bibleServiceMock.searchByWord.mockReturnValue(
      throwError(() => new Error('Erro'))
    );

    component.ngOnInit();

    expect(bibleServiceMock.searchByWord).toHaveBeenCalledWith(
      'nvi',
      'milagre'
    );
    expect(component.loading()).toBe(false);
    expect(component.searchResultsLength()).toBe(0);
  });
});
