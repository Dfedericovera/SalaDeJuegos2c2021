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
      import('./pages/menujuegos/menujuegos.module').then(m => m.MenujuegosModule),
    canActivate: [AuthGuard]
  },
  {
    path: `salaDeChat`, loadChildren: () =>
      import('./pages/sala-de-chat/sala-de-chat.module').then(m => m.SalaDeChatModule),
    canActivate: [AuthGuard]
  },
  {
    path: `ahorcado`, loadChildren: () =>
      import('./pages/ahorcado/ahorcado.module').then(m => m.AhorcadoModule),
    canActivate: [AuthGuard]
  },
  {
    path: `mayoromenor`, loadChildren: () =>
      import('./pages/mayoromenor/mayoromenor.module').then(m => m.MayoromenorModule),
    canActivate: [AuthGuard]
  },
  {
    path: `preguntados`, loadChildren: () =>
      import('./pages/preguntados/preguntados.module').then(m => m.PreguntadosModule),
    canActivate: [AuthGuard]
  },
  {
    path: `caraoseca`,
    loadChildren: () => import('./pages/caraoseca/caraoseca.module').then(m => m.CaraosecaModule),
    canActivate: [AuthGuard]
  },
  {
    path: `listadoResultados`,
    loadChildren: () => import('./pages/listado-resultados/listado-resultados.module').then(m => m.ListadoResultadosModule),
    canActivate: [AuthGuard]
  },
  {
    path: `encuesta`,
    loadChildren: () => import('./pages/encuesta/encuesta.module').then(m => m.EncuestaModule),
    canActivate: [AuthGuard]
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
