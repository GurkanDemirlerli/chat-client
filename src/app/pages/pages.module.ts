import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';

import { PagesComponent } from './pages.component';
import { ChatModule } from './chat/chat.module';
import { HomeModule } from './home/home.module';


const PAGES_COMPONENTS = [
    PagesComponent,
];

@NgModule({
    imports: [
        PagesRoutingModule,
        ChatModule,
        HomeModule
    ],
    declarations: [
        ...PAGES_COMPONENTS,
    ],
})
export class PagesModule {
}