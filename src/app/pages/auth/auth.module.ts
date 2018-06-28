import { NgModule } from '@angular/core';


import { AuthRoutingModule, routedComponents } from './auth-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
        AuthRoutingModule,
    ],
    declarations: [
        ...routedComponents,
    ],
})
export class AuthModule { }