import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';

import { Subject } from 'rxjs';
import { TicketComponent } from '../ticket/ticket.component';

import { Product } from '../model/product';
import { Firestore, addDoc, setDoc, deleteDoc, doc, collection, collectionData } from '@angular/fire/firestore';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { AuthService } from './auth.service';
import { query, where } from 'firebase/firestore';
import { SharedService } from './shared.service';

// import { AngularFireStorage } from '@angular/fire/compat/storage';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private firestore = inject(Firestore);
  private storage = inject(Storage);



  productsCollection = collection(this.firestore, 'products');
  wishListCollection = collection(this.firestore, 'wishlists');
  myordersCollection = collection(this.firestore, 'myorders');



  constructor(private autSer: AuthService, private sharedData: SharedService){}


  getProducts(): Observable<Product[]>{
    return collectionData(this.productsCollection) as Observable<Product[]>;
  }

  // uploadFile(input: HTMLInputElement) {
  // uploadFile(file: File): Observable<String> {
  //   const storageRef = ref(this.storage, file.name);
  //   const promise = uploadBytesResumable(storageRef, file).then((res) => {return res.ref});
  //   // return from(promise);

  //   // if (!input.files) return

  //   // const files: FileList = input.files;

  //   // for (let i = 0; i < files.length; i++) {
  //   //     const file = files.item(i);
  //   //     if (file) {
  //   //         const storageRef = ref(this.storage, file.name);
  //   //         uploadBytesResumable(storageRef, file);
  //   //     }
  //   // }
  // }

  addProduct(product: Product): Observable<String>{
    // uploadFile(file);
    product.sellerEmail = this.autSer.email;
    const productData = { ...product };
    console.log(productData)
    const promise = addDoc(this.productsCollection, productData).then((res) => {
      return res.id;
    });
    return from(promise);
  }

  updateProduct(productId: String, product: Product): Observable<void>{
    const docRef = doc(this.firestore, 'products' + productId);
    const updatePromise = setDoc(docRef, this.updateProduct);
    return from(updatePromise);
  }


  removeProduct(productId: String):  Observable<void>{
    const docRef = doc(this.firestore, 'products' + productId);
    const deletePromise = deleteDoc(docRef);
    return from(deletePromise);
  }



  addToWishList(product: Product){
    product.wisherEmail = this.autSer.email;
    console.log('this.autSer.email', this.autSer.email)
    const productData = { ...product };

    const promise = addDoc(this.wishListCollection, productData).then((res) => {
      return res.id;
    });

    return from(promise);

  }

  getWishList(): Observable<Product[]> {

    // Perform a query to filter products by seller field
    const dquery = query(this.wishListCollection, where('wisherEmail', '==', this.autSer.email));

    // Convert the query snapshot to observable
    return collectionData(dquery, { idField: 'id' }) as Observable<Product[]>;
  }

  searchByCategory(category: string): Observable<Product[]>{
    // Perform a query to filter products by seller field
    const dquery = query(this.productsCollection, where('category', '==', category));

    // Convert the query snapshot to observable
    return collectionData(dquery, { idField: 'id' }) as Observable<Product[]>;
  }

  searchByLoc(location: string): Observable<Product[]>{
    // Perform a query to filter products by seller field
    const dquery = query(this.productsCollection, where('loc', '==', location));

    // Convert the query snapshot to observable
    return collectionData(dquery, { idField: 'id' }) as Observable<Product[]>;
  }


  async removeFromWishList(id: string): Promise<void> {
    // console.log("ID", product.id)
    try {
      // Assuming 'wishlist' is the name of the collection where wish list items are stored
      const wishListDocRef = doc(this.wishListCollection, id);

      // Delete the document from Firestore
      await deleteDoc(wishListDocRef);

      console.log('Product removed from wish list successfully.');
    } catch (error) {
        console.error('Error removing product from wish list:', error);
        throw error; // Optionally, you can rethrow the error or handle it as needed
    }
  }

  getMyOrders(): Observable<Product[]> {

    // Perform a query to filter products by seller field
    const dquery = query(this.myordersCollection, where('buyerEmail', '==', this.autSer.email));

    // Convert the query snapshot to observable
    return collectionData(dquery, { idField: 'id' }) as Observable<Product[]>;
  }

  buyPorduct(product: Product){
    product.buyerEmail = this.autSer.email;
    console.log('this.autSer.email', this.autSer.email)
    const productData = { ...product };

    const promise = addDoc(this.myordersCollection, productData).then((res) => {
      return res.id;
    });

    return from(promise);
  }


  async removeFromMyOrders(id: string): Promise<void> {
    // console.log("ID", product.id)
    try {
      // Assuming 'wishlist' is the name of the collection where wish list items are stored
      const wishListDocRef = doc(this.myordersCollection, id);

      // Delete the document from Firestore
      await deleteDoc(wishListDocRef);

      console.log('Product removed from wish list successfully.');
    } catch (error) {
        console.error('Error removing product from wish list:', error);
        throw error; // Optionally, you can rethrow the error or handle it as needed
    }
  }

  getMyPostedProducts(): Observable<Product[]>{
    // Perform a query to filter products by seller field
    const dquery = query(this.productsCollection, where('sellerEmail', '==', this.sharedData.profile.email));

    // Convert the query snapshot to observable
    return collectionData(dquery, { idField: 'id' }) as Observable<Product[]>;
  }


  

}

/*
// search(productname: String): Observable<Product>{
  //   // Perform a query to filter products by seller field
  //   const dquery = query(this.productsCollection, where('name', '==', productname));

  //   // Convert the query snapshot to observable
  //   return collectionData(dquery, { idField: 'id' }) as Observable<Product>;
  // }
*/
