import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoResultadosComponent } from './listado-resultados.component';

const routes: Routes = [{
  path:'',component: ListadoResultadosComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListadoResultadosRoutingModule { }
