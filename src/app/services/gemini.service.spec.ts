import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IGeminiRequest } from '../interfaces/gemini.interface';
import { GeminiService } from './gemini.service';

describe('GeminiService', () => {
  let service: GeminiService;
  let httpClientSpy: { post: jest.Mock };

  beforeEach(() => {
    httpClientSpy = {
      post: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        GeminiService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });

    service = TestBed.inject(GeminiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send prompt and return response', () => {
    const mockResponse: IGeminiRequest = {
      candidates: [
        {
          content: {
            parts: [
              {
                text: 'Generated response text',
              },
            ],
          },
        },
      ],
      usageMetadata: {
        promptTokenCount: 10,
        candidatesTokenCount: 20,
        totalTokenCount: 30,
      },
      modelVersion: '1.5-flash',
    };

    httpClientSpy.post.mockReturnValue(of(mockResponse));

    service.sendPrompt('Test prompt').subscribe((response) => {
      expect(response).toEqual({
        text: 'Generated response text',
        usageMetadata: {
          promptTokenCount: 10,
          candidatesTokenCount: 20,
          totalTokenCount: 30,
        },
        modelVersion: '1.5-flash',
      });
    });

    expect(httpClientSpy.post).toHaveBeenCalled();
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });
});
