import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { OffersPage } from './pages/offers/offers.page';
import { OfferDetailsPage } from './pages/offer-details/offer-details.page';
import { RecoPage } from './pages/reco/reco.page';

export const routes: Routes = [
  { path: '', redirectTo: 'offers', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'offers', component: OffersPage },
  { path: 'offers/:id', component: OfferDetailsPage },
  { path: 'reco', component: RecoPage },
  { path: '**', redirectTo: 'offers' },
];
