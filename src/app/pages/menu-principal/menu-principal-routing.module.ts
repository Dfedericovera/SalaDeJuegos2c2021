import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuienSoyComponent } from '../quien-soy/quien-soy.component';
import { MenuPrincipalComponent } from './menu-principal.component';

const routes: Routes = [
  {
    path:"",component: MenuPrincipalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuPrincipalRoutingModule { }
