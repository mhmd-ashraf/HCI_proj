import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Profile } from '../model/profile';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  product: Product | undefined;
  conversationId: string = "";
  curUserEmail: string | undefined;
  profile: Profile  = {
    name:  "undefined",
    email: "undefined",
    phone: "undefined",
    since: "undefined",
    reviews : 0,
    dateofbirth: "undefined",
    products:  0,
    followers: 0
  };

  sender: String = "";
  reciever: String = "";
  
  constructor() { }


  removeDomain(email: string): string {
    const atIndex = email.indexOf('@');
    if (atIndex !== -1) {
        return email.substring(0, atIndex);
    }
    return email;
  }

}
