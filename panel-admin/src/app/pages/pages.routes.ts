import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'dashboard', component: StarterComponent },
      { path: 'Accounting', loadChildren: () => import('./accounting/accounting.routing').then((m) => m.accountingRoutes) },
    ]
  },
];
