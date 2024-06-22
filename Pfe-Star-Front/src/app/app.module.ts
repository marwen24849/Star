import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './monotoring/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { UnauthorizedComponent } from './component/unauthorized/unauthorized.component';
import { ArticleComponent } from './component/article/article.component';
import { BlogComponent } from './component/blog/blog.component';
import { Blog2Component } from './component/blog2/blog2.component';
import { CarComponent } from './component/car/car.component';
import { CarsComponent } from './component/cars/cars.component';
import { Cars2Component } from './component/cars2/cars2.component';
import { Cars3Component } from './component/cars3/cars3.component';
import { ContactComponent } from './component/contact/contact.component';
import { FaqComponent } from './component/faq/faq.component';
import { ForgotComponent } from './component/forgot/forgot.component';
import { IndexComponent } from './component/index/index.component';
import { Index2Component } from './component/index2/index2.component';
import { PricingComponent } from './component/pricing/pricing.component';
import { PrivacyComponent } from './component/privacy/privacy.component';
import { SigninComponent } from './component/signin/signin.component';
import { SignupComponent } from './component/signup/signup.component';
import { AddCarsComponent } from './component/add-cars/add-cars.component';
import { ListeAgenceComponent } from './component/liste-agence/liste-agence.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8081',
        realm: 'Pfe-Star',
        clientId: 'Teams-Pfe'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UnauthorizedComponent,
    ArticleComponent,
    BlogComponent,
    Blog2Component,
    CarComponent,
    CarsComponent,
    Cars2Component,
    Cars3Component,
    ContactComponent,
    FaqComponent,
    ForgotComponent,
    IndexComponent,
    Index2Component,
    PricingComponent,
    PrivacyComponent,
    SigninComponent,
    SignupComponent,
    AddCarsComponent,
    ListeAgenceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
