import { provideHttpClient } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { expect } from '@jest/globals';
import { of } from 'rxjs';
import { IChapterDetail } from '../../interfaces/bible.interface';
import { BibleService } from '../../services/bible.service';
import { ChapterDetailComponent } from './chapter-detail.component';

describe('ChapterDetailComponent', () => {
  let component: ChapterDetailComponent;
  let fixture: ComponentFixture<ChapterDetailComponent>;
  let bibleServiceMock: jest.Mocked<BibleService>;
  let activatedRouteMock: Partial<ActivatedRoute>;
  let routerMock: Partial<Router>;

  const mockResponse: IChapterDetail = {
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

  const paramMapMock: Partial<ParamMap> = {
    get: jest.fn((param: string) => {
      if (param === 'book') return 'gn';
      if (param === 'chapter') return '2';
      return null;
    }),
  };

  beforeEach(async () => {
    bibleServiceMock = {
      getChapter: jest.fn().mockReturnValue(of(mockResponse)),
      getBook: jest.fn().mockReturnValue(of(mockResponse)),
    } as unknown as jest.Mocked<BibleService>;

    activatedRouteMock = {
      snapshot: {
        paramMap: paramMapMock as ParamMap,
      },
    } as unknown as Partial<ActivatedRoute>;

    routerMock = {
      navigate: jest.fn().mockResolvedValue(true),
    };

    Object.defineProperty(window, 'scrollTo', {
      value: jest.fn(),
      writable: true,
    });

    await TestBed.configureTestingModule({
      imports: [ChapterDetailComponent],
      providers: [
        provideHttpClient(),
        { provide: BibleService, useValue: bibleServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load chapter on init', () => {
    component.ngOnInit();
    expect(bibleServiceMock.getChapter).toHaveBeenCalledWith('nvi', 'gn', '2');
    expect(component.chapter()).toEqual(mockResponse);
  });

  it('should navigate to next chapter', () => {
    component.ngOnInit();
    component.onNextChapter();
    expect(routerMock.navigate).toHaveBeenCalledWith([
      'biblia',
      'gn',
      'capitulo',
      3,
    ]);
  });

  it('should navigate to previous chapter', () => {
    component.ngOnInit();
    component.onPreviousChapter();
    expect(routerMock.navigate).toHaveBeenCalledWith([
      'biblia',
      'gn',
      'capitulo',
      1,
    ]);
  });

  it('should render chapter details and verses', () => {
    component.chapter.set(mockResponse);
    fixture.detectChanges();

    const element = fixture.nativeElement;
    expect(
      element.querySelector('[data-test="chapter-detail-book"]').textContent
    ).toContain('Gênesis 10');
    expect(
      element
        .querySelector('[data-test="chapter-detail-verse"]')
        .textContent.trim()
    ).toContain(
      '1 Este é o registro da descendência de Sem, Cam e Jafé, filhos de Noé. Os filhos deles nasceram depois do Dilúvio.'
    );
  });

  it('should display spinner when chapter is not available', () => {
    component.chapter.set(null);
    fixture.detectChanges();

    const element = fixture.nativeElement;
    expect(
      element.querySelector('[data-test="chapter-detail-loader"]')
    ).toBeTruthy();
  });

  it('should render back button with correct routerLink', () => {
    component.chapter.set(mockResponse);
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const backButton = element.querySelector(
      '[data-test="chapter-detail-back-button"]'
    );
    expect(backButton).toBeTruthy();
  });

  it('should set isFirstChapter and isLastChapter correctly', () => {
    component.updateNavigationState('gn', 1);
    expect(component.isFirstChapter()).toBe(true);
    expect(component.isLastChapter()).toBe(false);

    component.updateNavigationState('ap', 22);
    expect(component.isFirstChapter()).toBe(false);
    expect(component.isLastChapter()).toBe(true);

    component.updateNavigationState('ex', 5);
    expect(component.isFirstChapter()).toBe(false);
    expect(component.isLastChapter()).toBe(false);
  });

  it('should disable previous button if isFirstChapter is true', () => {
    component.isFirstChapter.set(true);
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const prevButton = element.querySelector(
      '[data-test="chapter-detail-previous-button"]'
    );
    expect(prevButton).toBeTruthy();
    expect(prevButton.textContent).toContain('Anterior');
  });

  it('should disable next button if isLastChapter is true', () => {
    component.isLastChapter.set(true);
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const nextButton = element.querySelector(
      '[data-test="chapter-detail-next-button"]'
    );
    expect(nextButton).toBeTruthy();
    expect(nextButton.textContent).toContain('Próximo');
  });

  it('should call scrollToTop on onNextChapter', fakeAsync(() => {
    const scrollToTopSpy = jest.spyOn(component, 'scrollToTop');
    component.onNextChapter();
    tick();
    expect(scrollToTopSpy).toHaveBeenCalled();
  }));

  it('should call scrollToTop on onPreviousChapter', fakeAsync(() => {
    const scrollToTopSpy = jest.spyOn(component, 'scrollToTop');
    component.onPreviousChapter();
    tick();
    expect(scrollToTopSpy).toHaveBeenCalled();
  }));
});
