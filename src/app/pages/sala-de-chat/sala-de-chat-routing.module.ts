import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalaDeChatComponent } from './sala-de-chat.component';

const routes: Routes = [{
  path:"",component: SalaDeChatComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaDeChatRoutingModule { }
