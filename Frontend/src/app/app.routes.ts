import { Routes } from '@angular/router';
import { LoginComponent } from './Components/auth/login/login.component';

export const routes: Routes = [
    {path : '', redirectTo : 'register', pathMatch : 'full'},
    {path : 'register', loadComponent : () =>  import('./Components/auth/register/register.component').then(m => m.RegisterComponent)},
    {path : 'login', loadComponent : () => import('./Components/auth/login/login.component').then(m => m.LoginComponent)},
    {path : 'dashboard', loadComponent : () => import('./Components/dashboard/dashboard.component').then(m => m.DashboardComponent)},
    {path : '**', component : LoginComponent}
];
