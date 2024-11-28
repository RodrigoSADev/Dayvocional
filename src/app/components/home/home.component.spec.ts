import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IVerseDetail } from '../../interfaces/bible.interface';
import { BibleService } from '../../services/bible.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let bibleServiceMock: jest.Mocked<BibleService>;

  const mockResponse: IVerseDetail = {
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

  beforeEach(async () => {
    bibleServiceMock = {
      getRandomVerse: jest.fn().mockReturnValue(of(mockResponse)),
    } as unknown as jest.Mocked<BibleService>;

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideHttpClient(),
        { provide: BibleService, useValue: bibleServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getRandomVerse on init', () => {
    component.ngOnInit();

    expect(bibleServiceMock.getRandomVerse).toHaveBeenCalledWith('nvi');
    expect(component.randomVerse()).toEqual(mockResponse);
  });

  it('should display loading spinner when loading', () => {
    component.randomVerse.set(null);
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const spinner = element.querySelector('[data-test="home-loader"]');

    expect(spinner).toBeTruthy();
  });

  it('should display random verses when available', () => {
    component.randomVerse.set(mockResponse);
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const verseText = element.querySelector('p');
    expect(verseText?.textContent).toContain(
      'No princípio, Deus criou os céus e a terra.'
    );
  });

  it('should call onGenerateExplantion when button is clicked', () => {
    jest.spyOn(component, 'onGenerateExplantion');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.onGenerateExplantion).toHaveBeenCalled();
  });

  it('should display loading spinner when explanationLoading is true', () => {
    component.explanationService.explanationLoading.set(true);
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector(
      '[data-test="home-explanation-loader"]'
    );
    expect(spinner).toBeTruthy();
  });

  it('should display explanation text when explanationLoading is false and explanationVerse has value', () => {
    component.explanationService.explanationLoading.set(false);
    component.explanationService.explanationVerse.set(
      'Explicação do versículo'
    );
    fixture.detectChanges();

    const explanationText = fixture.nativeElement.querySelector('p');
    expect(explanationText).toBeTruthy();
    expect(explanationText).not.toBeNull();
  });
});
