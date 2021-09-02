import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemotestComponent } from './memotest.component';

const routes: Routes = [ {
  path:"",component: MemotestComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemotestRoutingModule { }
