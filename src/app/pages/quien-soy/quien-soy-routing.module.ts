import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuienSoyComponent } from './quien-soy.component';
import { QuienSoyModule } from './quien-soy.module';

const routes: Routes = [{
  path:"",component: QuienSoyComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuienSoyRoutingModule { }
