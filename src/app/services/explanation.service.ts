import { inject, Injectable, signal } from '@angular/core';
import { GeminiService } from './gemini.service';

@Injectable({
  providedIn: 'root',
})
export class ExplanationService {
  geminiService = inject(GeminiService);

  explanationVerse = signal<string | null>(null);
  explanationGenerated = signal(false);
  explanationLoading = signal(false);

  generateExplanation(prompt: string): void {
    this.explanationLoading.set(true);
    this.explanationGenerated.set(true);
    this.geminiService.sendPrompt(prompt).subscribe({
      next: (resp) => {
        this.explanationVerse.set(resp.text);
        this.explanationLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao obter resposta da IA:', err);
        this.explanationLoading.set(false);
      },
    });
  }

  clearExplanation(): void {
    this.explanationVerse.set('');
    this.explanationGenerated.set(false);
  }
}
