import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Injectable } from "@angular/core";

//ROUTING
import { RouterModule } from "@angular/router";

//Html Client
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

//STYLES

//Toast
import { ToastrModule } from "ngx-toastr";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatBadgeModule } from "@angular/material/badge";
//Forms
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
//Angular Material
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatNativeDateModule } from "@angular/material";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatChipsModule } from "@angular/material/chips";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

//Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { environment } from "../environments/environment";

//AUTHS
import { AuthAdminGuard } from "./auth-admin.guard";
import { AuthUserGuard } from "./auth-user.guard";

//SERVICES
import { BooksService } from "./services/books/books.service";
import { CategoriesService } from "./services/categories/categories.service";
import { SalesService } from "./services/sales/sales.service";
import { UsersService } from "./services/users/users.service";

//COMPONENTS
import { AppComponent } from "./app.component";
import { ExtAppLayoutComponent } from "./components/layout/ext-app-layout/ext-app-layout.component";
import { IntAppLayoutComponent } from "./components/layout/int-app-layout/int-app-layout.component";
import { FooterComponent } from "./components/layout/footer/footer.component";
import { ExtHeaderComponent } from "./components/layout/ext-header/ext-header.component";
import { ExtMainSliderComponent } from "./components/layout/ext-main-slider/ext-main-slider.component";
import { BooksComponent } from "./components/books/books.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { CartComponent } from "./components/cart/cart.component";
import { SaleDetailComponent } from "./components/sale-detail/sale-detail.component";
import { StoreLocationComponent } from "./components/store-location/store-location.component";
import { SalesComponent } from "./components/sales/sales.component";
import { ExtAppToolbarComponent } from "./components/layout/ext-app-toolbar/ext-app-toolbar.component";
import { BookCardComponent } from "./components/book-card/book-card.component";
import { LoginComponent } from "./components/layout/login/login.component";
import { SignupComponent } from "./components/layout/signup/signup.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import {
  IntBooksComponent,
  DialogAddEjemplarDialog,
  DialogEjemplaresDialog,
  DialogEditarLibroDialog
} from "./components/int-books/int-books.component";
import {
  IntCategoriesComponent,
  DialogEditCategorieDialog,
  DialogNewCategorieDialog
} from "./components/int-categories/int-categories.component";
import {
  IntUsersComponent,
  DialogEditarUsuarioDialog
} from "./components/int-users/int-users.component";
import { IntSalesComponent } from "./components/int-sales/int-sales.component";
import { IntNewbookComponent } from "./components/int-newbook/int-newbook.component";
import { IntNewuserComponent } from "./components/int-newuser/int-newuser.component";
import { SaleCoreComponent } from "./components/sale-core/sale-core.component";
import { BasicAuthInterceptorService } from "./services/basic-auth-interceptor.service";
import { BooksSectionComponent } from './components/books-section/books-section.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { PayComponent } from './components/pay/pay.component';

@NgModule({
  declarations: [
    AppComponent,
    ExtAppLayoutComponent,
    IntAppLayoutComponent,
    FooterComponent,
    ExtHeaderComponent,
    ExtMainSliderComponent,
    BooksComponent,
    CategoriesComponent,
    CartComponent,
    SaleDetailComponent,
    StoreLocationComponent,
    SalesComponent,
    ExtAppToolbarComponent,
    BookCardComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    IntBooksComponent,
    IntCategoriesComponent,
    DialogEditCategorieDialog,
    DialogNewCategorieDialog,
    IntUsersComponent,
    DialogEditarUsuarioDialog,
    IntSalesComponent,
    DialogAddEjemplarDialog,
    DialogEjemplaresDialog,
    DialogEditarLibroDialog,
    IntNewbookComponent,
    IntNewuserComponent,
    SaleCoreComponent,
    BooksSectionComponent,
    BookDetailComponent,
    PayComponent
  ],
  entryComponents: [
    BookDetailComponent,
    DialogAddEjemplarDialog,
    DialogEjemplaresDialog,
    DialogEditarLibroDialog,
    DialogEditCategorieDialog,
    DialogNewCategorieDialog,
    DialogEditarUsuarioDialog,
    CartComponent,
    SaleCoreComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: ExtAppLayoutComponent
      },
      {
        path: "pay",
        component: PayComponent
      },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "signup",
        component: SignupComponent
      },
      {
        path: "admin",
        component: IntAppLayoutComponent,
        canActivate: [AuthAdminGuard],
        canActivateChild: [AuthAdminGuard],
        children: [
          {
            path: "",
            component: DashboardComponent
          },
          {
            path: "books",
            component: IntBooksComponent
          },
          {
            path: "newBook",
            component: IntNewbookComponent
          },
          {
            path: "categories",
            component: IntCategoriesComponent
          },
          {
            path: "users",
            component: IntUsersComponent
          },
          {
            path: "newUser",
            component: IntNewuserComponent
          },
          {
            path: "sales",
            component: IntSalesComponent
          }
        ]
      }
    ]),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-top-right",
      preventDuplicates: true
    }),
    FlexLayoutModule,
    MatMenuModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatGridListModule,
    MatChipsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [
    BooksService,
    UsersService,
    CategoriesService,
    SalesService,
    AuthAdminGuard,
    AuthUserGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
