import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Messege } from '../model/message';
import { ChatingService } from '../services/chating.service';
import { Conversation } from '../model/Conversation';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrl: './messenger.component.css'
})
export class MessengerComponent {
  conversation: Conversation = {reciever: "", sender: "", conversationId: "", messages: [] };
  newMessage: string = '';
  
  
  constructor(private profile: ProfileService, private chatService: ChatingService, private sharedData: SharedService) { }
  
  currentUser: String = this.sharedData.profile?.name ? this.sharedData.profile?.name : "" ; // Example current user, replace with authenticated user

  ngOnInit(): void {
    console.log(this.currentUser)
    // Initialize messages from your backend or mock data
    this.conversation.messages = [
    
    ];
    this.chatService.getConversation(this.sharedData.conversationId).subscribe(conversation => {
      if(conversation)
        this.conversation = conversation;

    });
    
  }

  sendMessage(): void {
    if (this.newMessage.trim() === '') return;

    const newMessage: Messege = {
      sender: this.currentUser,
      text: this.newMessage,
      timestamp: String(new Date())
    };

    // this.conversation.messages.push(newMessage);

    this.chatService.sendMessage(this.sharedData.conversationId, newMessage);
    this.newMessage = ''; // Clear input


  }

  parseDate(dateString: String): Date {
    // Assuming dateString is in a format that JavaScript's Date constructor can parse
    const dateStringPrimitive = dateString.toString();
    return new Date(dateStringPrimitive);
  }
}
