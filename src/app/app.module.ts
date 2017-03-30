import 'hammerjs'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material'
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AuthService } from './auth.service';

import { HomeComponent } from './home/home.component';
import { PhotosComponent } from './photos/photos.component';
import { ProductsComponent } from './products/products.component';
import { ProductsDetailComponent } from './products/products-detail.component';
import { BarbersComponent } from './barbers/barbers.component';
import { ServicesComponent } from './services/services.component';
import { AdminComponent } from './admin/admin.component';
import { JobsComponent } from './jobs/jobs.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { CreateAccountComponent, DialogContent } from './account/create-account/create-account.component';
import { UploadComponent } from './upload.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AddBarberComponent } from './admin/add-barber/add-barber.component';
import { AddPhotoComponent } from './admin/add-photo/add-photo.component';
import { AddServiceComponent } from './admin/add-service/add-service.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';

var firebaseConfig = {
  apiKey: "AIzaSyDGFYKBqQX8cHJAIbn0WuqFGNqctpYZMHc",
  authDomain: "cutthroat3-e9643.firebaseapp.com",
  databaseURL: "https://cutthroat3-e9643.firebaseio.com",
  storageBucket: "cutthroat3-e9643.appspot.com",
  messagingSenderId: "783552334671"
};
const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PhotosComponent,
    ProductsComponent,
    ProductsDetailComponent,
    BarbersComponent,
    ServicesComponent,
    AdminComponent,
    JobsComponent,
    ContactComponent,
    LoginComponent,
    AccountComponent,
    CreateAccountComponent,
    DialogContent,
    UploadComponent,
    AddProductComponent,
    AddBarberComponent,
    AccountComponent,
    AddPhotoComponent,
    AddServiceComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    MaterialModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'product/:id',component: ProductsDetailComponent },
      { path: 'barbers', component: BarbersComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'photos', component: PhotosComponent },
      { path: 'jobs', component: JobsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: CreateAccountComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'account', component: AccountComponent },
      { path: 'admin/products/add', component: AddProductComponent },
      { path: 'admin/barbers/add', component: AddBarberComponent },
      { path: 'admin/photo/add', component: AddPhotoComponent },
      { path: 'admin/services/add', component: AddServiceComponent },
      { path: 'admin/products/edit', component: EditProductComponent },
      
    ])
  ],
  entryComponents: [DialogContent],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
