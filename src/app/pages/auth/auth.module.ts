import { NgModule } from '@angular/core';


import { AuthRoutingModule, routedComponents } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        FormsModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        CommonModule
    ],
    declarations: [
        ...routedComponents,
    ],
})
export class AuthModule { }