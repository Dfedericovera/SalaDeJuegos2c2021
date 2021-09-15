import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './services/authguard.service';
const routes: Routes = [
  {
    path: 'login', loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginModule),
    data: { animation: 'login' }
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup-user/signup-user.module').then(m => m.SignupUserModule),
    data: { animation: 'signup' },

  },
  /*
   {path: 'quiensoy',component: QuienSoyComponent,data: {animation: 'home'}}, */
  {
    path: `home`,
    loadChildren: () =>
      import('./pages/menu-principal/menu-principal.module').then(m => m.MenuPrincipalModule),
    canActivate: [AuthGuard],
  },
  {
    path: `quiensoy`, loadChildren: () =>
      import('./pages/quien-soy/quien-soy.module').then(m => m.QuienSoyModule)
  },
  {
    path: `menujuegos`, loadChildren: () =>
      import('./pages/menujuegos/menujuegos.module').then(m => m.MenujuegosModule)
  },
  {
    path: `salaDeChat`, loadChildren: () =>
      import('./pages/sala-de-chat/sala-de-chat.module').then(m => m.SalaDeChatModule)
  },
  { path: ``, redirectTo: `home`, pathMatch: `full` }
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
