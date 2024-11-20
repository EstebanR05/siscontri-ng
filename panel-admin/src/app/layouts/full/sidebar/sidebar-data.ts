import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    bgcolor: 'primary',
    route: '/dashboard',
  },
  {
    navCap: 'Comprobantes',
  },
  {
    displayName: 'Contables',
    iconName: 'file-invoice',
    bgcolor: 'primary',
    route: '',
  },
  {
    displayName: 'Tesoreria',
    iconName: 'currency-dollar',
    bgcolor: 'primary',
    route: '',
  },
  {
    displayName: 'Comerciales',
    iconName: 'cloud-dollar',
    bgcolor: 'primary',
    route: '',
  },
  {
    displayName: 'Automatización',
    iconName: 'refresh',
    bgcolor: 'primary',
    route: '',
  },
  {
    navCap: 'Configuraciones',
  },
  {
    displayName: 'Cuentas Contables',
    iconName: 'table-options',
    bgcolor: 'primary',
    route: '',
  },
  {
    displayName: 'Parametros',
    iconName: 'settings',
    bgcolor: 'primary',
    route: '',
  },
  {
    displayName: 'Contactos',
    iconName: 'users',
    bgcolor: 'primary',
    route: '',
  },
  {
    navCap: 'Otros',
  },
  {
    displayName: 'Cierre de año',
    iconName: 'sunset-2',
    bgcolor: 'primary',
    route: '',
  }, {
    displayName: 'Traslado de cuentas',
    iconName: 'circuit-cell',
    bgcolor: 'primary',
    route: '',
  },
  {
    displayName: 'Reportes',
    iconName: 'chart-bar',
    bgcolor: 'primary',
    children: [
      {
        displayName: 'Reportes Comerciales',
        iconName: 'chart-dots-2',
        bgcolor: 'primary',
        route: '',
      }, {
        displayName: 'Reporte Contables',
        iconName: 'chart-histogram',
        bgcolor: 'primary',
        route: '',
      }
    ]
  },
  {
    bgcolor: 'accent',
  },
  // {
  //   displayName: 'Login',
  //   iconName: 'lock',
  //   bgcolor: 'accent',
  //   route: '/authentication/login',
  // },
  // {
  //   displayName: 'Register',
  //   iconName: 'user-plus',
  //   bgcolor: 'warning',
  //   route: '/authentication/register',
  // },
];
