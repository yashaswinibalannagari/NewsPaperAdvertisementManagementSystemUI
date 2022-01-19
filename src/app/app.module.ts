import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FaqsComponent } from './faqs/faqs.component';



import { ProcessHttpmsgService } from './services/process-httpmsg.service';
import { LoginService } from './services/login.service';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { RegisterComponent } from './register/register.component';
import { MyadsComponent } from './myads/myads.component';
import { AdvertisementService } from './services/advertisement.service';
import { AuthinterceptorService } from './services/authinterceptor.service';
import { NewaddComponent } from './newadd/newadd.component';
import { TermsComponent } from './terms/terms.component';
import { EditadComponent } from './editad/editad.component';
import { DeleteComponent } from './delete/delete.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { AlladsComponent } from './allads/allads.component';
import { ApproveadsComponent } from './approveads/approveads.component';
import { ApproveComponent } from './approve/approve.component';
import { ExpiredadsComponent } from './expiredads/expiredads.component';
import { ViewadComponent } from './viewad/viewad.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { ClientService } from './services/client.service';
import { NotificationsComponent } from './notifications/notifications.component';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AboutComponent,
    ContactComponent,
    FaqsComponent,
    AdminComponent,
    ClientComponent,
    RegisterComponent,
    MyadsComponent,
    NewaddComponent,
    TermsComponent,
    EditadComponent,
    DeleteComponent,
    UpdateprofileComponent,
    AlladsComponent,
    ApproveadsComponent,
    ApproveComponent,
    ExpiredadsComponent,
    ViewadComponent,
    AddadminComponent,
    NotificationsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatOptionModule,
    MatDialogModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:4200"],
        disallowedRoutes: ["http://localhost:4200/api/Login"],
      },
    }),

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthinterceptorService, multi: true },
    ProcessHttpmsgService,
    LoginService,
    AdvertisementService,
    ClientService,

  ],
  entryComponents: [

    LoginComponent,
    RegisterComponent,
    DeleteComponent,
    ApproveComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
