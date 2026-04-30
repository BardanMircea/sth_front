import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService, LoginResponse } from '../../core/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  private api = inject(ApiService);

  userId = 'u42';
  response?: LoginResponse;
  error?: string;

  login(): void {
    this.error = undefined;

    this.api.login(this.userId).subscribe({
      next: (res) => {
        this.response = res;
        localStorage.setItem('token', res.token);
      },
      error: (err) => {
        this.error = err.error?.message || 'Erreur login';
      },
    });
  }
}
