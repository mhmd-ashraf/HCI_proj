import { Injectable, inject } from '@angular/core';
import { Profile } from '../model/profile';
import { Observable } from 'rxjs';
import { Firestore, addDoc, collection, doc, getDoc, collectionData  } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Product } from '../model/product';
import { query, where } from 'firebase/firestore';
import { SharedService } from './shared.service';
// import {  } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private fireStore: Firestore,private sharedData: SharedService) { }

  getData(userEmail: string): Observable<Profile>{
    const userDocRef = doc(this.fireStore, 'profile', userEmail); // Reference to the user document
    
    const userDocSnapshot = getDoc(userDocRef); // Retrieve the document snapshot

    // Perform a query to filter products by seller field
    return new Observable<Profile>((observer) => {
      userDocSnapshot.then((doc) => {
        if (doc.exists()) {
        
          const userData = doc.data() as Profile; // Convert Firestore document data to Profile type
          this.sharedData.profile = userData;
          observer.next(userData); // Emit the user data
        
        } else {

          observer.next(undefined); // Emit undefined if user document does not exist
        
        }
        observer.complete(); // Complete the observable
      
      }).catch((error) => {
        
        observer.error(error); // Emit an error if there's any issue fetching the document
      
      });
    });
  }

  private firestore = inject(Firestore);

  profilesCollection = collection(this.firestore, 'profile');

  // getWishList(email: string): Observable<Profile> {

  //   // Perform a query to filter products by seller field
  //   const dquery = query(this.profilesCollection, where('email', '==', email));

  //   // Convert the query snapshot to observable
  
  //   return collectionData(dquery, { idField: 'id' }) as Observable<Profile[]>;
  // }

}
