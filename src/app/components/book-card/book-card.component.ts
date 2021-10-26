import { Component, OnInit, Input } from "@angular/core";
import { ToastrService } from "ngx-toastr";

import { MatDialog } from "@angular/material";

import { SalesService } from "src/app/services/sales/sales.service";
import { BooksService } from "../../services/books/books.service";
import { BooksContextService } from "../../services/books-context.service";
import { CartContextService } from "../../services/cart-context.service";

import { BookDetailComponent } from "../book-detail/book-detail.component";

@Component({
  selector: "app-book-card",
  templateUrl: "./book-card.component.html",
  styleUrls: ["./book-card.component.sass"],
})
export class BookCardComponent implements OnInit {
  @Input() ejemplar: any;
  cart: any = [];
  user: any;

  ejemplares: any = [];

  constructor(
    private booksService: BooksService,
    private booksContext: BooksContextService,
    private cartContext: CartContextService,
    private salesService: SalesService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  addToCart(ejemplar: any) {
    this.user = JSON.parse(localStorage.getItem("user"));

    this.cart.push(ejemplar);

    if (this.user !== null) {
      //add in cart of db
      this.salesService.addItemCarrito(ejemplar.ejemplarID).subscribe(
        (result) => {
          this.enviarMensaje(ejemplar);
          this.getEjemplares();
          this.myCart(this.user.usuarioID);
        },
        (error) => {
          console.error(JSON.stringify(error));
        }
      );
    }
  }

  myCart(userID: number) {
    this.salesService.myCart(userID).subscribe(
      (result) => {
        this.cartContext.setCart(result);
      },
      (error) => {
        console.error(JSON.stringify(error));
      }
    );
  }

  getEjemplares() {
    this.booksService.listarEjemplares().subscribe(
      (result) => {
        this.booksContext.setEjemplares(result);
      },
      (error) => {
        console.error(JSON.stringify(error));
      }
    );
  }

  enviarMensaje(ejemplar: any) {
    this.toastr.info("Agregado al carrito", ejemplar.libro.titulo);
  }

  openDetail() {
    const dialogRef = this.dialog.open(BookDetailComponent, {
      width: "550px",
      data: { libro: this.ejemplar.libro },
    });
  }
}
