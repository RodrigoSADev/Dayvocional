import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { IGeminiResponse } from '../interfaces/gemini.interface';
import { ExplanationService } from './explanation.service';
import { GeminiService } from './gemini.service';

describe('ExplanationService', () => {
  let service: ExplanationService;
  let geminiServiceMock: jest.Mocked<GeminiService>;

  const mockResponse: IGeminiResponse = {
    text: 'test response',
    usageMetadata: {
      promptTokenCount: 10,
      candidatesTokenCount: 20,
      totalTokenCount: 30,
    },
    modelVersion: '1.5-flash',
  };

  beforeEach(() => {
    geminiServiceMock = {
      sendPrompt: jest.fn(),
    } as unknown as jest.Mocked<GeminiService>;

    TestBed.configureTestingModule({
      providers: [
        ExplanationService,
        { provide: GeminiService, useValue: geminiServiceMock },
      ],
    });

    service = TestBed.inject(ExplanationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set loading and generated flags when generateExplanation is called', () => {
    geminiServiceMock.sendPrompt.mockReturnValue(of(mockResponse));

    service.generateExplanation('prompt');

    expect(service.explanationLoading()).toBe(false);
    expect(service.explanationGenerated()).toBe(true);
  });

  it('should set explanationVerse and reset loading flag on successful response', (done) => {
    geminiServiceMock.sendPrompt.mockReturnValue(of(mockResponse));

    service.generateExplanation('prompt');

    setTimeout(() => {
      expect(service.explanationVerse()).toBe('test response');
      expect(service.explanationLoading()).toBe(false);
      done();
    }, 0);
  });

  it('should log error and reset loading flag on error response', (done) => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    geminiServiceMock.sendPrompt.mockReturnValue(
      throwError(() => new Error('error'))
    );

    service.generateExplanation('prompt');

    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Erro ao obter resposta da IA:',
        expect.any(Error)
      );
      expect(service.explanationLoading()).toBe(false);
      consoleSpy.mockRestore();
      done();
    }, 0);
  });

  it('should clear explanationVerse and set generated flag to false when clearExplanation is called', () => {
    service.clearExplanation();

    expect(service.explanationVerse()).toBe('');
    expect(service.explanationGenerated()).toBe(false);
  });
});
