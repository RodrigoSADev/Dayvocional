import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { A11yComponent } from './components/a11y/a11y.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, A11yComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dayvocional';
}
