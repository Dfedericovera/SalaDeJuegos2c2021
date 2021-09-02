import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TatetiComponent } from './tateti.component';

const routes: Routes = [{path:"",component: TatetiComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TatetiRoutingModule { }
