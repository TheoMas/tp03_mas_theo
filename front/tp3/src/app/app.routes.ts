import { Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';

export const routes: Routes = [
    { path: '', redirectTo: '/accueil', pathMatch: 'full' },
    { path: 'accueil', component: Accueil },
];