import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ISearchWord } from '../../interfaces/book.interface';
import { BibleService } from '../../services/bible.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  bibleService = inject(BibleService);
  formBuilder = inject(FormBuilder);

  searchForm = this.formBuilder.group({
    search: ['', [Validators.required, Validators.minLength(2)]],
  });
  submitted = signal(false);
  searchResults = signal<ISearchWord[]>([]);

  onSearch(): void {
    const searchedWord = this.searchForm.get('search')?.value;
    if (this.searchForm.valid && searchedWord) {
      this.submitted.set(true);
      this.bibleService.searchByWord('nvi', searchedWord).subscribe((resp) => {
        console.log(resp);
        this.searchResults.set(resp);
      });
    }
  }
}
