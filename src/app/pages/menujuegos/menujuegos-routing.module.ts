import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenujuegosComponent } from './menujuegos.component';

const routes: Routes = [
  {
    path:"",component: MenujuegosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenujuegosRoutingModule { }
