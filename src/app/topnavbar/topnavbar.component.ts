import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.css'] // Note the correct spelling of styleUrls
})
export class TopnavbarComponent {
  constructor(private auth: AuthService, private router: Router){}

  logout(){
    console.log("write");
    this.auth.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('login');
      },
      error: (err) => {
        // Handle error
      }
    });
  }
}
