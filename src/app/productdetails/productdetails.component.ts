import { Component, inject } from '@angular/core';
import { Product } from '../model/product';
import { SharedService } from '../services/shared.service';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']  // Fix the typo from styleUrl to styleUrls
})
export class ProductdetailsComponent {
  product: Product | undefined;
  feedbackText: string = ''; // Add a property for the feedback text
  feedbacks: string[] = [];  // Add an array to store feedback messages

  
  router = inject(Router);

  constructor(private sharedServ: SharedService, private productService: ProductsService) {
    this.product = sharedServ.product;
  }

  addToWishList() {
    console.log(this.product);
    this.productService.addToWishList(this.product ? this.product : new Product("", 0, "", ""));
  }

  buyPorduct() {
    this.productService.buyPorduct(this.product ? this.product : new Product("", 0, "", ""));
  }


  navigateToChat(){
    if(this.product?.sellerEmail){
      var text1 = this.sharedServ.removeDomain(this.sharedServ.profile.email + "") + this.sharedServ.removeDomain(this.product?.sellerEmail);
      var text2 = this.sharedServ.removeDomain(this.product?.sellerEmail) + this.sharedServ.removeDomain(this.sharedServ.profile.email + ""); 
      const conversationId = text1 < text2 ? text1 : text2;

      this.sharedServ.conversationId = conversationId;
      this.sharedServ.sender = this.product?.sellerEmail < this.sharedServ.profile.email + "" ? this.product?.sellerEmail : this.sharedServ.profile.email + "";
      this.sharedServ.reciever = this.product?.sellerEmail > this.sharedServ.profile.email + "" ? this.product?.sellerEmail : this.sharedServ.profile.email + "";


      this.router.navigate(['messenger']);;
    }
  }

  sendFeedback() {
    if (this.feedbackText.trim()) {
      // Push the feedback text into the feedbacks array
      this.feedbacks.push(this.feedbackText.trim());
      // Optionally, log or send the feedbacks to a server here
      console.log('Feedbacks:', this.feedbacks);
      // Clear the textarea after sending
      this.feedbackText = '';
    } else {
      alert('Please write some feedback before sending.');
    }
  }
}
