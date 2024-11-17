import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  searchForm = this.formBuilder.group({
    search: ['', [Validators.required, Validators.minLength(2)]],
  });
  submitted = signal(false);

  onSearch(): void {
    const searchedWord = this.searchForm.get('search')?.value;
    if (this.searchForm.valid && searchedWord) {
      this.submitted.set(true);
      this.router.navigate(['/busca'], {
        queryParams: { palavra: searchedWord },
      });
    }
  }
}
