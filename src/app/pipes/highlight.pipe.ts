import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, search: string): string {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, 'gi');
    return text.replace(
      regex,
      `<span class="bg-warning p-1 rounded">$1</span>`
    );
  }
}
