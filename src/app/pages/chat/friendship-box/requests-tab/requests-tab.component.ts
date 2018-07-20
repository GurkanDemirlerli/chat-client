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
    sentRequests;
    receivedRequests;

    constructor(
        private socket: Socket,
        private friendshipService: FriendShipService
    ) {
        this.friendshipService.getSendedRequests().subscribe((requests) => {
            this.sentRequests = requests.data;
        });
        this.friendshipService.getReceivedRequests().subscribe((requests) => {
            this.receivedRequests = requests.data;
        });
    }


    acceptFriendShipRequest(friendShipRequestId, userId) {
        this.friendshipService.acceptFriendShipRequest(friendShipRequestId).subscribe((result) => {
            if (result.success) {
                for (var i = 0; i < this.receivedRequests.length; i++)
                    if (this.receivedRequests[i].sender._id == userId) {
                        this.receivedRequests.splice(i, 1);
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
                for (var i = 0; i < this.receivedRequests.length; i++)
                    if (this.receivedRequests[i].sender._id == userId) {
                        this.receivedRequests.splice(i, 1);
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
                for (var i = 0; i < this.sentRequests.length; i++)
                    if (this.sentRequests[i].receiver._id == userId) {
                        this.sentRequests.splice(i, 1);
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
