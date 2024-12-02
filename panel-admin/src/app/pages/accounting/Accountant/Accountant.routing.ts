import { AccountantListComponent } from "./accountant-list/accountant-list.component";
import { AccountantManagerComponent } from "./accountant-manager/accountant-manager.component";


export const AccountantRoutes = [
    {
        path: '',
        component: AccountantListComponent,
    },
    {
        path: 'create',
        component: AccountantManagerComponent,
    },
    {
        path: 'edit/:id',
        component: AccountantManagerComponent,
    },
];