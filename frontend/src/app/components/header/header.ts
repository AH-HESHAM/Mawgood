import { Component, effect, signal } from '@angular/core';
import { inject } from '@angular/core/primitives/di';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isDark = signal(false);
  constructor(public auth: AuthService) {
    effect(() => {
      document.body.classList.toggle('dark', this.isDark());
    });
  }

  toggleTheme() {
    this.isDark.update((v) => !v);
  }

  getUserRole(){
    return this.auth.user()?.role;
  }
}
