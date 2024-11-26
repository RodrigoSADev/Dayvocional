import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  IGeminiRequest,
  IGeminiResponse,
} from '../interfaces/gemini.interface';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  http = inject(HttpClient);

  private apiUrl =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent';
  private apiKey = 'AIzaSyCCuvxVPaTOCy8tmCBKDsRcGOCu_eT23yM';

  /*
    gemini-1.5-flash: nosso modelo multimodal mais rápido
    gemini-1.5-pro: nosso modelo multimodal mais eficiente e inteligente
  */

  sendPrompt(prompt: string): Observable<IGeminiResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };

    return this.http
      .post<IGeminiRequest>(`${this.apiUrl}?key=${this.apiKey}`, body, {
        headers,
      })
      .pipe(
        map((response) => {
          const candidate = response.candidates[0];
          return {
            text: candidate.content.parts[0].text,
            usageMetadata: response.usageMetadata,
            promptTokenCount: response.usageMetadata.promptTokenCount,
            candidatesTokenCount: response.usageMetadata.candidatesTokenCount,
            totalTokenCount: response.usageMetadata.totalTokenCount,
            modelVersion: response.modelVersion,
          };
        })
      );
  }
}
