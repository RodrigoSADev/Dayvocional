import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-a11y',
  standalone: true,
  imports: [],
  templateUrl: './a11y.component.html',
  styleUrl: './a11y.component.scss',
})
export class A11yComponent {
  fontSize = 0;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  onIncreaseFontSize() {
    this.document.body.style.setProperty(
      'font-size',
      `calc(1rem + ${++this.fontSize}px)`
    );
  }

  onDecreaseFontSize() {
    this.document.body.style.setProperty(
      'font-size',
      `calc(1rem + ${--this.fontSize}px)`
    );
  }
}
