import { Headers, RequestOptions } from '@angular/http';

export class ServicesHelpers {

    static createAuthenticationHeader() {
        let authToken = localStorage.getItem('token');
        return new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': authToken
            })
        });
    }

}