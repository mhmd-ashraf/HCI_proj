import { Component } from '@angular/core';
import { Product } from '../model/product';
import { Subscription } from 'rxjs';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  wishlist: Product[] = [];
  productsSubscription: Subscription | undefined;
  

  constructor(private productService: ProductsService){

    // this.wishlist = productService.getProducts();
    // console.log(this.wishlist)


      this.productService.getProducts().subscribe(
        (data)=>{
          console.log("DAta")
          console.log(data)
          this.wishlist = data

        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
      console.log("this.productsSubscription");
      console.log(this.productsSubscription);
    }

    searchByCategory(category: string){
      this.productService.searchByCategory(category).subscribe(
        (data)=>{
          console.log("DAta")
          console.log(data)
          this.wishlist = data
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    }

    searchByLocation(loc: string){
      this.productService.searchByCategory(loc).subscribe(
        (data)=>{
          console.log("DAta")
          console.log(data)
          this.wishlist = data
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    }

  buyOrder(i: number){
    this.productService.buyPorduct(this.wishlist[i]);
  }


  ngOnDestroy () {
    this.productsSubscription?.unsubscribe();
  }

  func(i : number): string {
    if(this.wishlist[i].image && this.wishlist[i].image != ""){
      return this.wishlist[i].image;
    }
    return "https://c4.wallpaperflare.com/wallpaper/597/950/396/hd-image-of-nature-for-pc-1920x1080-wallpaper-preview.jpg"
  }

  filter(cat: string){
    this.searchByCategory(cat);
  }
}
