import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DettaglioAnnuncioComponent } from './components/dettaglio-annuncio/dettaglio-annuncio.component';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent},
  { path: 'dettaglio-annuncio/:id', component: DettaglioAnnuncioComponent }
];
