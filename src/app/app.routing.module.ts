import { RouterModule, Routes, ExtraOptions } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
    { path: '', redirectTo: 'pages/auth/login', pathMatch: 'full' },
    { path: '**', redirectTo: 'pages' },
];

// const config: ExtraOptions = {
//     useHash: true,
// }

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}