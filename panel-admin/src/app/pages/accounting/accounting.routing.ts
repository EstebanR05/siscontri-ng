import { Routes } from '@angular/router';
import { AccountantListComponent } from './Accountant/accountant-list/accountant-list.component';

export const accountingRoutes: Routes = [
    { path: 'Accountant', loadChildren: () => import('./Accountant/Accountant.routing').then((m) => m.AccountantRoutes) },
];