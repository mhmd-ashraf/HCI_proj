import { Component, Input, inject } from '@angular/core';
import { Product } from '../model/product';
import { ProductsService } from '../services/products.service';
import { Subscription } from 'rxjs';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  @Input() productimage: string | undefined;
  @Input() productname: string = "product one";
  @Input() productprice: number = 0;
  @Input() location: string = "";
  @Input() since: string = "";
  @Input() id: string = '';
  @Input() sellerEmail: string = '';
  @Input() wisherEmail: string = '';
  @Input() order: boolean = false;
  @Input() buyerEmail: string = '';
  @Input() producdescription: string ="undefined";
  @Input() isLiked: boolean = false;
  @Input() category: string = "";
  
  productsSubscription: Subscription | undefined;
  product: Product = {
    category: '',
    id: '',
    name: '',
    description: '',
    since: '',
    price: 0,
    loc: '',
    sellerEmail: '',
    wisherEmail: '',
    buyerEmail: '',
    image: "" // Reset the images property to an empty array
  };
  
  constructor(private productServices: ProductsService, private sharedServices: SharedService){
    
  }


 

  toggleLike() {
    if(!this.isLiked && this.order == false)
      this.addToWishList();
    else if(this.order == false)
      this.removeFromWishList()
    else if(this.order == true)
      this.removeFromMyOrders();

    
    this.isLiked = !this.isLiked;
  }

  addToWishList(){
    this.fillProduct();

    this.productServices.addToWishList(this.product);
  }

  removeFromMyOrders(){
    this.productServices.removeFromMyOrders(this.id);
  }

  removeFromWishList(){
    console.log("this.id : ", this.id);
    this.productServices.removeFromWishList(this.id);
  }

  router = inject(Router)

  clickOnLinkToViewDetails(){
    this.fillProduct();


    console.log(this.product);
    this.sharedServices.product = this.product; 
    this.router.navigateByUrl('/productdetails');

  }


  fillProduct(){
    this.product = {
      category: this.category ? this.category : "",
      id: this.id ? this.id : "",
      name: this.productname ? this.productname : "",
      description: this.producdescription ? this.producdescription : "",
      since: this.since ? this.since : "",
      price: this.productprice ? this.productprice : 0,
      buyerEmail: this.buyerEmail ? this.buyerEmail : "",
      loc: this.location ? this.location : "",
      sellerEmail: this.sellerEmail ? this.sellerEmail : "",
      wisherEmail: this.wisherEmail ? this.wisherEmail : "",

      image: this.productimage ? this.productimage : ""
    };
    console.log(this.product);
  }

}
