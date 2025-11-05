import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DettaglioAnnuncioComponent } from './components/dettaglio-annuncio/dettaglio-annuncio.component';
import { ImmobiliComponent } from './components/immobili/immobili.component';
import { TrattativeComponent } from './components/trattative/trattative.component';
import { AnnunciComponent } from './components/annunci/annunci.component';
import { authGuard } from './guards/auth.guard';
import { TrattativeAnnuncioComponent } from './components/trattative-annuncio/trattative-annuncio.component';
import { AggiungiImmobileComponent } from './components/aggiungi-immobile/aggiungi-immobile.component';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent, canActivate: [authGuard]},
  { path: 'dettaglio-annuncio/:id', component: DettaglioAnnuncioComponent, canActivate: [authGuard]},
  { path: 'immobili', component: ImmobiliComponent, canActivate: [authGuard]},
  { path: 'trattative', component: TrattativeComponent, canActivate: [authGuard]},
  { path: 'annunci', component: AnnunciComponent, canActivate: [authGuard]},
  { path: 'trattative-annuncio/:id', component: TrattativeAnnuncioComponent, canActivate: [authGuard]},
  { path: 'aggiungi-immobile', component: AggiungiImmobileComponent, canActivate: [authGuard]},
];
