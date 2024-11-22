import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { IBook } from '../../interfaces/bible.interface';
import { BibleService } from '../../services/bible.service';
import { ListBooksComponent } from './list-books.component';

describe('ListBooksComponent', () => {
  let component: ListBooksComponent;
  let fixture: ComponentFixture<ListBooksComponent>;
  let bibleServiceMock: jest.Mocked<BibleService>;
  let router: Router;

  const mockResponse: IBook[] = [
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

  beforeEach(async () => {
    bibleServiceMock = {
      getBooks: jest.fn().mockReturnValue(of(mockResponse)),
    } as unknown as jest.Mocked<BibleService>;

    await TestBed.configureTestingModule({
      imports: [ListBooksComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: BibleService, useValue: bibleServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListBooksComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    jest
      .spyOn(router, 'navigate')
      .mockImplementation(() => Promise.resolve(true));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display grouped books when books are available', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const groupHeaders = fixture.nativeElement.querySelectorAll(
      '[data-test="list-books-name"]'
    );
    expect(groupHeaders.length).toBe(3);
    expect(groupHeaders[0].textContent).toContain('Pentateuco');
    expect(groupHeaders[1].textContent).toContain('Históricos');
    expect(groupHeaders[2].textContent).toContain('Cartas');

    const buttons = fixture.nativeElement.querySelectorAll(
      '[data-test="list-books-button"]'
    );
    expect(buttons.length).toBeGreaterThan(0);
    expect(buttons[0].textContent).toContain('Gênesis');
    expect(buttons[1].textContent).toContain('Josué');
    expect(buttons[2].textContent).toContain('Efésios');
  });

  it('should display spinner when no books are available', () => {
    component.books.set([]);
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector(
      '[data-test="list-books-loader"]'
    );
    expect(spinner).toBeTruthy();
  });

  it('should capitalize words correctly', () => {
    const result = component.capitalizeWords('test capitalize words');
    expect(result).toBe('Test Capitalize Words');
  });

  it('should render buttons with correct routerLink attributes', () => {
    const buttons = fixture.nativeElement.querySelectorAll(
      '[data-test="list-books-button"]'
    );
    expect(buttons.length).toBeGreaterThan(0);
    expect(buttons[0].getAttribute('ng-reflect-router-link')).toBe('gn');
    expect(buttons[1].getAttribute('ng-reflect-router-link')).toBe('js');
    expect(buttons[2].getAttribute('ng-reflect-router-link')).toBe('ef');
  });
});
