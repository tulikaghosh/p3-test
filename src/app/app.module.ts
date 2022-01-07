import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FooterComponent } from './footer/footer.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './users/login/login.component';
import { LogoutComponent } from './users/logout/logout.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './users/register/register.component';
import { CheckoutComponent } from './product/product-checkout/checkout/checkout.component';
import { AdminComponent } from './users/admin/admin.component';
import { HelloAdminComponent } from './users/login/hello/hello-admin/hello-admin.component';
import { HelloCustomerComponent } from './users/login/hello/hello-customer/hello-customer.component';
import { StoreProductComponent } from './product/store-product/store-product.component';
import { ProfileComponent } from './users/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingPageComponent,
    FooterComponent,
    ChatComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    CheckoutComponent,
    AdminComponent,
    HelloAdminComponent,
    HelloCustomerComponent,
    StoreProductComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
