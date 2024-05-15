import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;




  fullName!: string;
  email!: string;
  password!: string;
  termsAndConditions!: boolean;

  constructor(private auth: AuthService, private router: Router){}

  onSubmit() {
    if (this.registerForm.valid) {

      console.log('Register form submitted');
      console.log('Full Name:', this.fullName);
      console.log('Email Address:', this.email);
      console.log('Password:', this.password);

      this.auth.register(this.email, this.fullName, this.password).subscribe({
        next: () => {
          this.router.navigateByUrl('login');
        },
        error: (err) => {

        }
      });
      console.log("End");
    } else {
      console.log('Please fill in all required fields.');
    }
  }

  isWeakPassword(password: string): boolean {

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return !passwordRegex.test(password);
  }
}







