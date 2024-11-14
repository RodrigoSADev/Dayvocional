import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { A11yComponent } from './components/a11y/a11y.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, A11yComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dayvocional';
}
