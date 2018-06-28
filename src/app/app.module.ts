import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { server } from '../environments/environment';

import { AuthNotAllowed, AuthRequired } from './guards/auth.guard';

import { AuthService } from './providers';


import { NavbarComponent } from './components';

import { AppRoutingModule } from './app.routing.module';


const config: SocketIoConfig = { url: server.url, options: {} }

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent

  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    CommonModule,


    AppRoutingModule,

    SocketIoModule.forRoot(config),

    RouterModule,
  ],
  providers: [
    AuthService,
    AuthRequired,
    AuthNotAllowed,
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
