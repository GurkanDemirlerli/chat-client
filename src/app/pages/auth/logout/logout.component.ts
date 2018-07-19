import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../../../providers';

@Component({
    selector: 'app-logout',
    template:
        ` 
            Çıkış Yapılıyor. Lütfen Bekleyiniz.
        `,
})
export class LogoutComponent {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {
        this.authService.logout();
        this.router.navigate(['/pages/auth/login']);
    }
}