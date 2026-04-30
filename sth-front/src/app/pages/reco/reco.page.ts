import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, RecommendationResponse } from '../../core/api.service';

@Component({
  selector: 'app-reco-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reco.page.html',
  styleUrl: './reco.page.scss',
})
export class RecoPage {
  private api = inject(ApiService);

  city = 'PAR';
  k = 3;

  recommendations: RecommendationResponse[] = [];
  loading = false;
  error?: string;

  search(): void {
    this.loading = true;
    this.error = undefined;

    this.api.getRecommendations(this.city, this.k).subscribe({
      next: (data) => {
        this.recommendations = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Erreur recommandations';
        this.loading = false;
      },
    });
  }
}
