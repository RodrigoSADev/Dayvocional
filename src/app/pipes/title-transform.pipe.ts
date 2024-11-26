import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleTransform',
  standalone: true,
})
export class TitleTransformPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    return value.replace(/\*\*(.*?)\*\*/g, '<h3 class="mt-3">$1</h3>');
  }
}
