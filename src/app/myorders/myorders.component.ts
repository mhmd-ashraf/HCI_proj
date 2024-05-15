import { Component } from '@angular/core';
import { Product } from '../model/product';
import { Subscription } from 'rxjs';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrl: './myorders.component.css'
})
export class MyordersComponent {
  
  products: Product[] = [];
  productsSubscription: Subscription | undefined;


  constructor(private productService: ProductsService){



    this.productService.getMyOrders().subscribe(
      (data)=>{
        console.log("DAta")
        console.log(data)
        this.products = data
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );

    console.log("this.productsSubscription");
   
  }

  

  ngOnDestroy () {
    this.productsSubscription?.unsubscribe();
  }

  func(i : number): string{
    if(this.products[i].image && this.products[i].image != ""){
      return this.products[i].image;
    }
    return "https://c4.wallpaperflare.com/wallpaper/597/950/396/hd-image-of-nature-for-pc-1920x1080-wallpaper-preview.jpg"
  }

}
