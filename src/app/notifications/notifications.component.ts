import { Component, inject } from '@angular/core';
import { ChatingService } from '../services/chating.service';
import { Conversation } from '../model/Conversation';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  notifications: Conversation[] = [];

  constructor(private shareData: SharedService, private chateServices: ChatingService){}

  ngOnInit():void{
    this.chateServices.getConversations().subscribe((conversations)=>{
      this.notifications = conversations;
    });
    console.log(this.notifications);
  }

  getNotifications(notification: Conversation): String | undefined{

    if(notification.sender == this.shareData.curUserEmail)
        return notification.reciever;
    else if(notification.reciever == this.shareData.curUserEmail)
      return notification.sender;

    
    return undefined;
  }

  router = inject(Router);

  navigatToMessenger(conversationId: String){
    this.shareData.conversationId = conversationId + "";
    this.router.navigate(['/messenger']);
  }

}
