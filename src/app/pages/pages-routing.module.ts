import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { AuthRequired } from '../guards/auth.guard';

const routes: Routes = [{
    path: '',
    component: PagesComponent,
    children: [{
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthRequired]
    }, {
        path: 'chat',
        component: ChatComponent,
        canActivate: [AuthRequired]
    }, {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule',
    }, {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {

}