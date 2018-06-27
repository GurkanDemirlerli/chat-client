import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { server } from '../environments/environment';
import { ChatComponent } from './chat/chat.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AuthNotAllowed, AuthRequired } from './guards/auth.guard';

const config: SocketIoConfig = { url: server.url, options: {} }
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent, canActivate: [AuthNotAllowed] },
  { path: 'chat', component: ChatComponent, canActivate: [AuthRequired] },
  { path: 'login', component: LoginComponent, canActivate: [AuthNotAllowed] },
];

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    HomeComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    SocketIoModule.forRoot(config),
    RouterModule.forRoot(appRoutes)// <-- debugging purposes only
  ],
  providers: [
    AuthService,
    AuthRequired,
    AuthNotAllowed
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
