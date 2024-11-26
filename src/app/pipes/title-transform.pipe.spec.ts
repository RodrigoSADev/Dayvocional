import { TitleTransformPipe } from './title-transform.pipe';

describe('TitleTransformPipe', () => {
  let pipe: TitleTransformPipe;

  beforeEach(() => {
    pipe = new TitleTransformPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform text with ** to h3 tags', () => {
    const value = 'This is a **title** example';
    const result = pipe.transform(value);
    expect(result).toBe('This is a <h3 class="mt-3">title</h3> example');
  });

  it('should return the same value if no ** is present', () => {
    const value = 'This is a title example';
    const result = pipe.transform(value);
    expect(result).toBe(value);
  });

  it('should return the same value if input is empty', () => {
    const value = '';
    const result = pipe.transform(value);
    expect(result).toBe(value);
  });

  it('should return the same value if input is null', () => {
    const value = null;
    const result = pipe.transform(value!);
    expect(result).toBe(value);
  });

  it('should transform multiple ** to h3 tags', () => {
    const value = '**First** and **Second** titles';
    const result = pipe.transform(value);
    expect(result).toBe(
      '<h3 class="mt-3">First</h3> and <h3 class="mt-3">Second</h3> titles'
    );
  });
});
