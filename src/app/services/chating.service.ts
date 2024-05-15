import { Injectable, inject } from '@angular/core';

import { DataSnapshot, Database, get, getDatabase, onValue, push, ref, set} from 'firebase/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { Conversation } from '../model/Conversation';
import { Messege } from '../model/message';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class ChatingService {
  private db: Database;
  constructor(private sharedData: SharedService) { 
    this.db = getDatabase();
  }

  getConversations(): Observable<Conversation[]> {
    const conversationsRef = ref(this.db, 'Conversation');
    const conversationsSubject = new BehaviorSubject<Conversation[]>([]);

    // Listen for value changes on conversationsRef
    onValue(conversationsRef, (snapshot: DataSnapshot) => {
      const conversations: Conversation[] = [];

      snapshot.forEach(childSnapshot => {
        const conversation = childSnapshot.val() as Conversation;
        conversation.conversationId = childSnapshot.key; // Set the conversation ID
        conversations.push(conversation);
      });

      conversationsSubject.next(conversations);
    });

    return conversationsSubject as Observable<Conversation[]>;
  
  }

  getConversation(conversation_Id: string): Observable<Conversation | null> {
    const conversationRef = ref(this.db, `Conversation/${conversation_Id}`);
    const conversationSubject = new BehaviorSubject<Conversation | null>(null);

    // Listen for value changes on the conversationRef
    onValue(conversationRef, (snapshot: DataSnapshot) => {
      const conversation = snapshot.val() as Conversation | null;
      // if (conversation) {
      //   conversation.conversationId = snapshot.key; // Set the conversation ID
      // }
      conversationSubject.next(conversation);
    });

    return conversationSubject as Observable<Conversation>;
  }

  // `Conversation/${conversationId}/messages/` is Array not object 
  async sendMessage(conversationId: string, message: Messege): Promise<void> {
    if( this.sharedData.sender && this.sharedData.reciever)
      this.updateconversationmetaData(conversationId);
  
    try {
        const messagesRef = ref(this.db, `Conversation/${conversationId}/messages/`);
        
        // Retrieve the current messages array
        const messagesSnapshot = await get(messagesRef);
        const messagesArray = messagesSnapshot.val() || []; // If no messages exist, initialize as an empty array

        // Append the new message to the array
        messagesArray.push(message);

        // Update the messages array in the database
        await set(messagesRef, messagesArray);

        return Promise.resolve(); // Return a resolved promise
    } catch (error) {
        console.error("Error sending message:", error);
        return Promise.reject(error);
    }
  }

  async updateconversationmetaData(conversationId: String): Promise<void>{
    try{
      const sender = ref(this.db, `Conversation/${conversationId}/sender`);
      const reciever = ref(this.db, `Conversation/${conversationId}/reciever`);


      await set(sender, this.sharedData.sender);
      await set(reciever, this.sharedData.reciever);

      return Promise.resolve();
  
    } catch (error) {
      console.error("Error sending message:", error);
      return Promise.reject(error);
    }
  }

 
}