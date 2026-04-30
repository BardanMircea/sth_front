import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService, OfferDetailsResponse } from '../../core/api.service';

@Component({
  selector: 'app-offer-details-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './offer-details.page.html',
  styleUrl: './offer-details.page.scss',
})
export class OfferDetailsPage implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);

  data?: OfferDetailsResponse;
  loading = false;
  error?: string;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = 'ID offre manquant';
      return;
    }

    this.loading = true;

    this.api.getOfferById(id).subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Erreur détail offre';
        this.loading = false;
      },
    });
  }
}
