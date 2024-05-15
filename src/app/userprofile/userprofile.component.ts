import { Component } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../model/profile';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../services/shared.service';
import { Product } from '../model/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent {
  image = "https://s3-alpha.figma.com/profile/34e29411-e7c6-41aa-aacd-7c5e57238eb2";


  profile: Profile | undefined;
  
  myPostedProducts : Product[] = [];
  
  productsSubscription: Subscription | undefined;

  email: string = "ahmed@gmail.com";
  constructor(private productServices: ProductsService, private profileService: ProfileService, private autSer: AuthService, private shareData: SharedService){
    this.profile = {
      name: "undefined",
      email: "undefined",
      phone:"undefined",
      since: "undefined",
      dateofbirth: "undefined",
      reviews : 0,
      products: 0,
      followers: 0
    };


    console.log("this.shareData.curUserEmail : ", this.shareData.curUserEmail);
    profileService.getData(this.shareData.curUserEmail ? this.shareData.curUserEmail : "").subscribe(
      (data)=>{
        this.profile = data;
        
      }, (err)=>{
        console.error('Error fetching products:', err);
      }
    );

    productServices.getMyPostedProducts().subscribe((data)=>{
      this.myPostedProducts = data;
    }, (err)=>{
      console.error('Error fetching products:', err);
    });
  }




  ngOnDestroy () {
    this.productsSubscription?.unsubscribe();
  }

}
