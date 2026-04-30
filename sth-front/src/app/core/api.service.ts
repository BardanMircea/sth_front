import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Leg {
  flightNum: string;
  dep: string;
  arr: string;
  duration: string;
}

export interface Hotel {
  name: string;
  nights: number;
  price: number;
}

export interface Activity {
  title: string;
  price: number;
}

export interface Offer {
  id: string;
  from: string;
  to: string;
  departDate: string;
  returnDate: string;
  provider: string;
  price: number;
  currency: string;
  legs: Leg[];
  hotel?: Hotel;
  activity?: Activity;
}

export interface OfferDetailsResponse {
  offer: Offer;
  relatedOffers: string[];
}

export interface RecommendationResponse {
  city: string;
  score: number;
}

export interface LoginResponse {
  token: string;
  expires_in: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080';

  login(userId: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { userId });
  }

  searchOffers(
    from: string,
    to: string,
    limit: number,
    q?: string,
  ): Observable<Offer[]> {
    let url = `${this.baseUrl}/offers?from=${from}&to=${to}&limit=${limit}`;

    if (q && q.trim()) {
      url += `&q=${q}`;
    }

    return this.http.get<Offer[]>(url);
  }

  getOfferById(id: string): Observable<OfferDetailsResponse> {
    return this.http.get<OfferDetailsResponse>(`${this.baseUrl}/offers/${id}`);
  }

  getRecommendations(
    city: string,
    k: number,
  ): Observable<RecommendationResponse[]> {
    return this.http.get<RecommendationResponse[]>(
      `${this.baseUrl}/reco?city=${city}&k=${k}`,
    );
  }
}
