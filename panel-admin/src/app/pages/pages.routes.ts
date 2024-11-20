import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: StarterComponent }
    ]
  },
];
