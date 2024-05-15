import { Component, ViewChild, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  router = inject(Router);

  constructor(private auth: AuthService, private sharedData: SharedService){}

  email: string = "";
  password: string = "";
  rememberMe: boolean = false;


  onSubmit(){
    if (this.loginForm.valid) {

      console.log('Register form submitted');
      console.log('Email Address:', this.email);
      console.log('Password:', this.password);

      console.log("Start login")
      this.sharedData.curUserEmail = this.email;
      this.auth.login(this.email, this.password).subscribe({
        next: () => {
          this.router.navigateByUrl('profile');
        },
        error: (err) => {

        }
      });

      console.log("End");
    } else {
      console.log('Please fill in all required fields.');
    }
  }

}
