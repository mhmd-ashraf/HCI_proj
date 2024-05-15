import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AuthRedirectGuard } from './auth-redirect.guard';
import { MyordersComponent } from './myorders/myorders.component';
import { MessengerComponent } from './messenger/messenger.component';
import { ContactusComponent } from './contactus/contactus.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AuthRedirectGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthRedirectGuard] },
  {path: '', component: HomeComponent,  canActivate: [AuthGuard]},
  {path: 'post', component: ProductInfoComponent, canActivate: [AuthGuard]},
  {path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: UserprofileComponent, canActivate: [AuthGuard]},
  {path: 'notification', component: NotificationsComponent, canActivate: [AuthGuard]},
  {path: 'productdetails', component: ProductdetailsComponent, canActivate: [AuthGuard]},
  {path: 'myorders', component: MyordersComponent, canActivate: [AuthGuard]},
  {path: 'contactus', component: ContactusComponent, canActivate: [AuthGuard]},
  {path: 'messenger', component: MessengerComponent, canActivate: [AuthGuard]}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
