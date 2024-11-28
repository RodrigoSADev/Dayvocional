import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { expect } from '@jest/globals';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render navigation links', () => {
    const element = fixture.nativeElement;
    const navLinks = element.querySelectorAll('.nav-link');
    expect(navLinks.length).toBe(2);
  });

  it('should have correct routerLink for Home', () => {
    const element = fixture.nativeElement;
    expect(
      element.querySelector('[data-test="navbar-home-button"]')
    ).toBeTruthy();
  });

  it('should have correct routerLink for Bíblia', () => {
    const element = fixture.nativeElement;
    expect(
      element.querySelector('[data-test="navbar-bible-button"]')
    ).toBeTruthy();
  });
});
