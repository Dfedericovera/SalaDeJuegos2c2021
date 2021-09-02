import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaraosecaComponent } from './caraoseca.component';

const routes: Routes = [ {
  path:"",component: CaraosecaComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaraosecaRoutingModule { }
