import { Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';
import { Details } from './details/details';
import { PollutionForm } from './pollution-form/pollution-form';

export const routes: Routes = [
    { path: '', redirectTo: '/accueil', pathMatch: 'full' },
    { path: 'accueil', component: Accueil },
    { path: 'details/:id', component: Details },
    { path: 'pollution-form', component: PollutionForm },
    { path: 'pollution-form/:id', component: PollutionForm },
];