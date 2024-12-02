import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/authentication/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', loadChildren: () => import('./pages/pages.routes').then((m) => m.PagesRoutes) }
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      { path: 'authentication', loadChildren: () => import('./pages/authentication/authentication.routes').then((m) => m.AuthenticationRoutes), },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/login',
  },
];
