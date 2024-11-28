import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { expect } from '@jest/globals';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render logo with correct src and alt attributes', () => {
    const element = fixture.nativeElement;
    const logoImg = element.querySelector('[data-test="header-image"]');
    expect(logoImg).toBeTruthy();
    expect(logoImg.src).toContain('logo.png');
    expect(logoImg.alt).toBe('Logo do Dayvocional');
  });

  it('should have a link that navigates to the home page', () => {
    const element = fixture.nativeElement;
    const homeLink = element.querySelector('[data-test="header-link"]');
    expect(homeLink).toBeTruthy();
  });

  it('should render the search component', () => {
    const element = fixture.nativeElement;
    const searchComponent = element.querySelector('app-search');
    expect(searchComponent).toBeTruthy();
  });
});
