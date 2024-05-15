import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../model/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-mypostedproduct',
  templateUrl: './mypostedproduct.component.html',
  styleUrl: './mypostedproduct.component.css'
})
export class MypostedproductComponent {
  wishlist: Product[] = [];
  productsSubscription: Subscription | undefined;


  constructor(private productService: ProductsService){

    // this.wishlist = productService.getProducts();
    // console.log(this.wishlist)



    this.productService.getMyPostedProducts().subscribe(
      (data)=>{

        this.wishlist = data
        console.log("this.wishlist : ", this.wishlist[0].id)
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
    console.log("this.productsSubscription");
    console.log(this.productsSubscription);
  }

  func(i : number): string{
    if(this.wishlist[i].image && this.wishlist[i].image != ""){
      return this.wishlist[i].image;
    }
    return "https://c4.wallpaperflare.com/wallpaper/597/950/396/hd-image-of-nature-for-pc-1920x1080-wallpaper-preview.jpg"
  }

  


  ngOnDestroy () {
    this.productsSubscription?.unsubscribe();
  }

}
