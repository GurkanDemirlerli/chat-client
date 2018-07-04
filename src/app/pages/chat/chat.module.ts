import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { ChatComponent } from './chat.component';
import { FriendShipBoxComponent } from './friendship-box/friendship-box.component';
import { FriendsTabComponent } from './friendship-box/friends-tab/friends-tab.component';
import { RequestsTabComponent } from './friendship-box/requests-tab/requests-tab.component';
import { CommonModule } from '@angular/common';
import { MessageBoxComponent } from './message-box/message-box.component';
import { SearchTabComponent } from './friendship-box/search-tab/search-tab.component';
import { NotificationsTabComponent } from './friendship-box/notifications-tab/notifications-tab.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
    ],
    declarations: [
        ChatComponent,
        FriendShipBoxComponent,
        FriendsTabComponent,
        NotificationsTabComponent,
        RequestsTabComponent,
        SearchTabComponent,
        MessageBoxComponent,
    ],
})
export class ChatModule { }