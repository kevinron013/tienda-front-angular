import { Component, OnInit } from "@angular/core";
import { CartContextService } from "../../../services/cart-context.service";
import { BooksContextService } from "../../../services/books-context.service";
import { ShouldShowHMaterialService } from "../../../services/should-show-hmaterial.service";
import { BooksService } from "../../../services/books/books.service";
import { CartComponent } from "../../cart/cart.component";

import { MatDialog } from "@angular/material";

import { Router } from "@angular/router";

@Component({
  selector: "app-ext-app-toolbar",
  templateUrl: "./ext-app-toolbar.component.html",
  styleUrls: ["./ext-app-toolbar.component.sass"]
})
export class ExtAppToolbarComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem("user"));
  items: number;
  ejemplares: any = [];
  searchParam: String = "";

  constructor(
    private router: Router,
    private state: ShouldShowHMaterialService,
    private cartContext: CartContextService,
    private booksContext: BooksContextService,
    private booksService: BooksService,
    public dialog: MatDialog
  ) {
    this.myCart();
  }

  ngOnInit() {}

  openCartDialog() {
    const dialogRef = this.dialog.open(CartComponent, {
      width: "550px",
      data: { ejemplares: this.ejemplares, usuario: this.user }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  signOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("basicauth");
    window.location.reload();
  }

  myCart() {
    if (this.user !== null) {
      this.cartContext.currentCart.subscribe(
        result => {
          this.ejemplares = result;
          this.items = this.ejemplares.length;
        },
        error => {
          console.error(JSON.stringify(error));
        }
      );
    }
  }

  searchLibros() {
    this.booksService.searchLibros(this.searchParam).subscribe(
      result => {
        this.booksContext.setEjemplares(result);
        this.state.setState(false);
      },
      error => {
        console.error(JSON.stringify(error));
      }
    );
  }

  goHome() {
    this.booksService.listarEjemplares().subscribe(
      result => {
        this.booksContext.setEjemplares(result);
        this.state.setState(true);
        this.router.navigateByUrl("");
      },
      error => {
        console.error(JSON.stringify(error));
      }
    );
  }
}
