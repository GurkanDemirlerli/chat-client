import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { server } from '../environments/environment';

import { AuthNotAllowed, AuthRequired } from './guards/auth.guard';

import { SocketService, MessageService, UserService, AuthService, FriendShipService, LocalNotificationService } from './providers';

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
    ReactiveFormsModule,


    AppRoutingModule,

    SocketIoModule.forRoot(config),

    RouterModule,
  ],
  providers: [
    AuthService,
    AuthRequired,
    AuthNotAllowed,
    FriendShipService,
    LocalNotificationService,
    MessageService,
    SocketService,
    UserService,
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
