import { Injectable, inject } from '@angular/core';
import { Observable, catchError, from, map, of } from 'rxjs';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  user,
  signOut,

} from '@angular/fire/auth';
import { Firestore, addDoc, setDoc, deleteDoc, doc, collection, collectionData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Profile } from '../model/profile';
import { SharedService } from './shared.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  email: string = "";
  
  private firestore = inject(Firestore);
  profilesCollection = collection(this.firestore, 'profile');
  profile: Profile = {
    name: "username",
    email: "email",
    phone:"undefined",
    since: "undefined",
    dateofbirth: "undefined",
    reviews : 0,
    products: 0,
    followers: 0
  };

  constructor(private router: Router, private sharedData: SharedService, private profileSer: ProfileService){}

  register(email: string, username: string, password: string): Observable<void>{
    this.sharedData.curUserEmail = email;
    this.email = email;
    this.profile = {
        name: username,
        email: email,
        phone:"undefined",
        since: "undefined",
        dateofbirth: "undefined",
        reviews : 0,
        products: 0,
        followers: 0
    };

    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response)=>{
      console.log("Successful Registramtion");
      this.createProfile(this.profile);
      updateProfile(response.user, {displayName: username})}
    );
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    this.email = email;
    // userData = profileSer.getData();
    this.sharedData.profile.email = email;
    this.sharedData.curUserEmail = email;
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((res) => {}).catch((err) => {
      console.error("Login error:", err);
      throw err;
    });

    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    console.log("LOGOUT");
    return from(promise);
  }

  createProfile(profile: Profile){

    const profileId = profile.email;
  
    profile.email = this.email;

    // Create a reference to the profile document with the specified ID
    const profileRef = doc(this.profilesCollection, String(profileId));

      // Set the data for the profile document
    const promise = setDoc(profileRef, profile)
    .then(() => {
      console.log("Profile successfully created!");
      return profileId; // Return the profile ID
    })
    .catch((error) => {
      console.error("Error creating profile: ", error);
      throw error;
    });
  }

  checkAuthentication(): Observable<boolean> {
    return this.user$.pipe(
      map(user => !!user),
      catchError(error => {
        console.error("Authentication check error:", error);
        return of(false);
      })
    );
  }

  redirectIfNotAuthenticated(): void {
    this.checkAuthentication().subscribe(isAuthenticated => {
      if (!isAuthenticated) {
        this.router.navigate(['/login']);
      }
    });
  }

}
