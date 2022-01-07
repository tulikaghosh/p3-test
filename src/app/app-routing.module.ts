import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { CheckoutComponent } from './product/product-checkout/checkout/checkout.component';
import { StoreProductComponent } from './product/store-product/store-product.component';
import { AdminGuard } from './users/admin.guard';
import { AdminComponent } from './users/admin/admin.component';
import { LoginComponent } from './users/login/login.component';
import { LogoutComponent } from './users/logout/logout.component';
import { ProfileComponent } from './users/profile/profile.component';
import { RegisterComponent } from './users/register/register.component';


const routes: Routes = [
  { path: "chat", component:ChatComponent},
  { path: "register", component:RegisterComponent},
  { path: "login", component:LoginComponent},
  { path: "logout", component:LogoutComponent},
  { path: "admin", component:AdminComponent },
  { path: "profile", component:ProfileComponent },
  { path: "product", component:StoreProductComponent},
  { path: "checkout", component: CheckoutComponent, canActivate: [AdminGuard]  }, 
  { path: '', redirectTo: 'product', pathMatch: 'full'},

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
