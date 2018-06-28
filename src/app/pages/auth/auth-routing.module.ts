import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
// import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [{
    path: '',
    component: AuthComponent,
    children: [
        {
            path: 'login',
            component: LoginComponent,
        }, {
            path: 'signup',
            component: SignupComponent,
        },
        //  {
        //   path: 'logout',
        //   component: LogoutComponent,
        // },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule { }

export const routedComponents = [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    // LogoutComponent,
];