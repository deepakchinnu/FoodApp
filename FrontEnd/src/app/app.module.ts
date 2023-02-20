import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partial/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RatingModule } from 'ng-starrating';
import { SearchComponent } from './components/partial/search/search.component';
import { TagsComponent } from './components/partial/tags/tags.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { TitleComponent } from './components/partial/title/title.component';
import { NotFoundComponent } from './components/partial/not-found/not-found.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { InputContainerComponent } from './components/partial/input-container/input-container.component';
import { InputValidationComponent } from './components/partial/input-validation/input-validation.component';
import { TextInputComponent } from './components/partial/text-input/text-input.component';
import { DefaultButtonComponent } from './components/partial/default-button/default-button.component';
import { RegisterPaageComponent } from './components/pages/register-paage/register-paage.component';
import { LoadingComponent } from './components/partial/loading/loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { OrderItemListComponent } from './components/partial/order-item-list/order-item-list.component';
import { MapComponent } from './components/partial/map/map.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { PaypalButtonComponent } from './components/partial/paypal-button/paypal-button.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        SearchComponent,
        TagsComponent,
        FoodPageComponent,
        CartPageComponent,
        TitleComponent,
        NotFoundComponent,
        LoginPageComponent,
        InputContainerComponent,
        InputValidationComponent,
        TextInputComponent,
        DefaultButtonComponent,
        RegisterPaageComponent,
        LoadingComponent,
        CheckoutPageComponent,
        OrderItemListComponent,
        MapComponent,
        PaymentPageComponent,
        PaypalButtonComponent

    ],
    providers: [
      {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
      {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true}
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        RatingModule,
        HttpClientModule,
        ReactiveFormsModule,
        ToastrModule.forRoot({
          timeOut:3000,
          positionClass:'toast-bottom-right',
          newestOnTop:false
        })
    ]
})
export class AppModule { }
