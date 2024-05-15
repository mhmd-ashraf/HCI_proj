import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../model/product';


// interface ProductInfo {
//   taskName: string;
//   description: string;
//   data: string;
//   setPrice: string;
//   location: string;
//   images: File[]; // Change the image property to an array to hold multiple files
// }

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})


export class ProductInfoComponent {


  product: Product = new Product('', 0, '', '');
  // image: File | undefined;
  constructor(private productService: ProductsService){}

  addItem() {
    // Check if any of the form fields are empty
    if ( !this.product?.name || !this.product?.description || !this.product?.since || !this.product.price || !this.product?.loc) {
      alert("Please fill in all fields.");
      return;
    }

    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")

    // Push the current productInfo to the productList
    this.productService.addProduct(this.product);

    this.product = {
      category: "",
      id: "",
      name: '',
      description: '',
      since: '',
      price: 0,
      loc: '',
      sellerEmail: '',
      buyerEmail: '',
      wisherEmail: '',
      image: "" // Reset the images property to an empty array
    };
    console.log(this.productService.getProducts());
  }


    // Handle file selection
    async onFileSelected(event: any) {
      // const files: FileList = event.target.files;
      // for (let i = 0; i < files.length; i++) {
      //   const file = files[i];
      //   if (!this.product.images) {
      //     this.product.images = [];
      //   }
      //   this.product.i mages.push(file);

      //   // Optionally, you can display the uploaded image immediately
      //   const base64Image = await this.convertFileToBase64(file);
      //   console.log(base64Image); // Do something with the base64Image
      // }
      // this.image = event.target.files[0];

    }

    // Handle file drop
    async onFileDropped(event: any) {
      // event.preventDefault();
      // const files: FileList = event.dataTransfer.files;
      // for (let i = 0; i < files.length; i++) {
      //   const file = files[i];
      //   if (!this.product.images) {
      //     this.product.images = [];
      //   }
      //   this.product.images.push(file);

      //   // Optionally, you can display the uploaded image immediately
      //   const base64Image = await this.convertFileToBase64(file);
      //   console.log(base64Image); // Do something with the base64Image
      // }
    }

    // Handle drag over
    onDragOver(event: any) {
      // event.preventDefault();
    }

    // Function to convert file to base64
    async convertFileToBase64(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
      });
    }

    // Function to get the base64 image source
    async getImageSrc(image: File): Promise<string> {
      return await this.convertFileToBase64(image);
    }


}
