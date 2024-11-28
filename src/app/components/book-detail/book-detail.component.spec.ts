import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { expect } from '@jest/globals';
import { of } from 'rxjs';
import { IBook } from '../../interfaces/bible.interface';
import { BibleService } from '../../services/bible.service';
import { BookDetailComponent } from './book-detail.component';

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let bibleServiceMock: jest.Mocked<BibleService>;
  let activatedRouteMock: Partial<ActivatedRoute>;

  const mockResponse: IBook = {
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

  beforeEach(async () => {
    bibleServiceMock = {
      getBook: jest.fn().mockReturnValue(of(mockResponse)),
    } as unknown as jest.Mocked<BibleService>;

    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue(of('gn')),
        },
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [BookDetailComponent],
      providers: [
        { provide: BibleService, useValue: bibleServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch book details and chapters on init', () => {
    component.ngOnInit();

    expect(component.book()).toEqual(mockResponse);
    expect(component.chapters()).toEqual(
      component.chapters().map((_, i) => i + 1)
    );
  });

  it('should display book details and chapters', () => {
    component.book.set(mockResponse);
    component.chapters().map((_, i) => i + 1);
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const name = element.querySelector('[data-test="book-detail-name"]');
    const author = element.querySelector('[data-test="book-detail-author"]');
    const group = element.querySelector('[data-test="book-detail-group"]');
    const testament = element.querySelector(
      '[data-test="book-detail-testament"]'
    );

    expect(name?.textContent).toContain('Gênesis');
    expect(author?.textContent).toContain('Moisés');
    expect(group?.textContent).toContain('Pentateuco');
    expect(testament?.textContent).toContain('VT');

    expect(
      element.querySelectorAll('button.btn-primary').length
    ).toBeGreaterThan(1);
  });

  it('should display spinner when no chapters are available', () => {
    component.chapters.set([]);
    fixture.detectChanges();

    const element = fixture.nativeElement;
    expect(
      element.querySelector('[data-test="book-detail-loader"]')
    ).toBeTruthy();
  });
});
