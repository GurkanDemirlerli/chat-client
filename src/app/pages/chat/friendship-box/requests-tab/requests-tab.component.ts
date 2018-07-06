import { FriendShipService } from '../../../../providers';
import { Socket } from 'ng-socket-io';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-requests-tab',
    templateUrl: './requests-tab.component.html',
    styleUrls: ['./requests-tab.component.css']
})
export class RequestsTabComponent implements OnInit {
    requests;

    constructor(
        private socket: Socket,
        private friendshipService: FriendShipService
    ) {
        this.friendshipService.getMyAllFriendShipRequests().subscribe((requests) => {
            console.log(requests);
            this.requests = requests.data;
        });
    }


    acceptFriendShipRequest(friendShipRequestId, userId) {
        this.friendshipService.acceptFriendShipRequest(friendShipRequestId).subscribe((result) => {
            if (result.success) {
                for (var i = 0; i < this.requests.length; i++)
                    if (this.requests[i].sender._id == userId) {
                        this.requests.splice(i, 1);
                        break;
                    }
                this.friendshipService.emitReceivedFriendRequestsCount(this.friendshipService.receivedFriendRequestsCount.value - 1);
            } else {
                console.log('HATA');
            }
        });
    }

    rejectFriendShipRequest(friendShipRequestId, userId) {
        this.friendshipService.rejectFriendShipRequest(friendShipRequestId).subscribe((result) => {
            if (result.success) {
                for (var i = 0; i < this.requests.length; i++)
                    if (this.requests[i].sender._id == userId) {
                        this.requests.splice(i, 1);
                        break;
                    }
                this.friendshipService.emitReceivedFriendRequestsCount(this.friendshipService.receivedFriendRequestsCount.value - 1);
            } else {
                console.log('HATA');
            }
        });
    }

    cancelSendedFriendShipRequest(friendShipRequestId, userId) {
        this.friendshipService.cancelSendedFriendShipRequest(friendShipRequestId).subscribe((result) => {
            if (result.success) {
                for (var i = 0; i < this.requests.length; i++)
                    if (this.requests[i].receiver._id == userId) {
                        this.requests.splice(i, 1);
                        break;
                    }
            } else {
                console.log('HATA');
            }
        });
    }


    ngOnInit() {
    }

}
