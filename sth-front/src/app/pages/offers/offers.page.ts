import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService, Offer } from '../../core/api.service';

@Component({
  selector: 'app-offers-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './offers.page.html',
  styleUrl: './offers.page.scss',
})
export class OffersPage {
  private api = inject(ApiService);

  from = 'PAR';
  to = 'TYO';
  limit = 10;
  q = '';

  offers: Offer[] = [];
  loading = false;
  error?: string;

  search(): void {
    this.loading = true;
    this.error = undefined;

    this.api.searchOffers(this.from, this.to, this.limit, this.q).subscribe({
      next: (data) => {
        this.offers = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Erreur recherche offres';
        this.loading = false;
      },
    });
  }
}
