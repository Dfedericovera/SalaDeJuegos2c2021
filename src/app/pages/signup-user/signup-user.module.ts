import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupUserRoutingModule } from './signup-user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SignupUserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SignupUserModule { }
