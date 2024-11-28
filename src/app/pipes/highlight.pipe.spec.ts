import { expect } from '@jest/globals';
import { HighlightPipe } from './highlight.pipe';

describe('HighlightPipe', () => {
  let pipe: HighlightPipe;

  beforeEach(() => {
    pipe = new HighlightPipe();
  });

  it('should create an instance', () => {
    const pipe = new HighlightPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the original text if no search term is provided', () => {
    const text = 'This is a test';
    const result = pipe.transform(text, '');
    expect(result).toBe(text);
  });

  it('should highlight the search term in the text', () => {
    const text = 'This is a test';
    const search = 'test';
    const result = pipe.transform(text, search);
    expect(result).toBe(
      'This is a <span class="bg-warning p-1 rounded">test</span>'
    );
  });

  it('should highlight all occurrences of the search term in the text', () => {
    const text = 'This test is a test';
    const search = 'test';
    const result = pipe.transform(text, search);
    expect(result).toBe(
      'This <span class="bg-warning p-1 rounded">test</span> is a <span class="bg-warning p-1 rounded">test</span>'
    );
  });

  it('should be case insensitive when highlighting the search term', () => {
    const text = 'This Test is a test';
    const search = 'test';
    const result = pipe.transform(text, search);
    expect(result).toBe(
      'This <span class="bg-warning p-1 rounded">Test</span> is a <span class="bg-warning p-1 rounded">test</span>'
    );
  });

  it('should handle special characters in the search term', () => {
    const text = 'This is a test (special)';
    const search = '(special)';
    const result = pipe.transform(text, search);
    expect(result).toBe(
      'This is a test (<span class="bg-warning p-1 rounded">special</span>)'
    );
  });
});
