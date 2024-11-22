import { ComponentFixture, TestBed } from '@angular/core/testing';

import { A11yComponent } from './a11y.component';

describe('A11yComponent', () => {
  let component: A11yComponent;
  let fixture: ComponentFixture<A11yComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [A11yComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(A11yComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase font size when onIncreaseFontSize is called', () => {
    component.onIncreaseFontSize();
    expect(document.body.style.getPropertyValue('font-size')).toBe(
      'calc(1rem + 1px)'
    );
  });

  it('should decrease font size when onDecreaseFontSize is called', () => {
    component.onIncreaseFontSize();
    component.onDecreaseFontSize();
    expect(document.body.style.getPropertyValue('font-size')).toBe(
      'calc(1rem + 0px)'
    );
  });

  it('should render buttons with correct aria-labels', () => {
    const element = fixture.nativeElement;
    const increaseButton = element.querySelector(
      'button[aria-label="Clique para aumentar o tamanho da fonte"]'
    );
    const decreaseButton = element.querySelector(
      'button[aria-label="Clique para diminuir o tamanho da fonte"]'
    );
    expect(increaseButton).toBeTruthy();
    expect(decreaseButton).toBeTruthy();
  });
});
