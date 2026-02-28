import { Component, effect, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isDark = signal(false);

  constructor() {
    effect(() => {
      document.body.classList.toggle('dark', this.isDark());
    });
  }

  toggleTheme() {
    this.isDark.update((v) => !v);
  }
}
