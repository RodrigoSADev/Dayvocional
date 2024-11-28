import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { expect } from '@jest/globals';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render search input with correct attributes', () => {
    const searchInput = fixture.nativeElement.querySelector(
      '[data-test="search-input"]'
    );
    expect(searchInput).toBeTruthy();
    expect(searchInput.getAttribute('type')).toBe('search');
    expect(searchInput.getAttribute('formControlName')).toBe('search');
  });

  it('should render search button with correct attributes', () => {
    const searchButton = fixture.nativeElement.querySelector(
      '[data-test="search-button"]'
    );
    expect(searchButton).toBeTruthy();
    expect(searchButton.classList).toContain('btn');
  });

  it('should show error message when input is touched and empty', () => {
    const searchInput = fixture.nativeElement.querySelector(
      '[data-test="search-input"]'
    );
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    searchInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.text-danger');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain(
      'Por favor, digite uma palavra.'
    );
  });

  it('should show error message when input is less than 2 characters', () => {
    const searchInput = fixture.nativeElement.querySelector(
      '[data-test="search-input"]'
    );
    searchInput.value = 'a';
    searchInput.dispatchEvent(new Event('input'));
    searchInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.text-danger');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain(
      'Digite uma palavra com no mínimo duas palavras.'
    );
  });

  it('should navigate to /busca with queryParams when form is valid and submitted', () => {
    const searchInput = fixture.nativeElement.querySelector(
      '[data-test="search-input"]'
    );
    searchInput.value = 'palavra';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const searchButton = fixture.nativeElement.querySelector(
      '[data-test="search-button"]'
    );
    searchButton.click();
    fixture.detectChanges();

    expect(component.submitted()).toBeTruthy();
  });

  it('should call onSearch and navigate when form is valid', () => {
    const searchInput = fixture.nativeElement.querySelector(
      '[data-test="search-input"]'
    );
    searchInput.value = 'palavra';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const navigateSpy = jest.spyOn(router, 'navigate');
    component.onSearch();

    expect(component.submitted()).toBeTruthy();
    expect(navigateSpy).toHaveBeenCalledWith(['/busca'], {
      queryParams: { palavra: 'palavra' },
    });
  });

  it('should not navigate when form is invalid', () => {
    const searchInput = fixture.nativeElement.querySelector(
      '[data-test="search-input"]'
    );
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const navigateSpy = jest.spyOn(router, 'navigate');
    component.onSearch();

    expect(component.submitted()).toBeFalsy();
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
