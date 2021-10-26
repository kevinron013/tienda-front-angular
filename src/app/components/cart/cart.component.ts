import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
  MatSnackBar
} from "@angular/material";
import { SalesService } from "../../services/sales/sales.service";
import { BooksService } from "../../services/books/books.service";
import { CartContextService } from "../../services/cart-context.service";
import { BooksContextService } from "../../services/books-context.service";
import { SaleCoreComponent } from "../sale-core/sale-core.component";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.sass"]
})
export class CartComponent implements OnInit {
  ejemplares: any = [];
  sourceEjemplares: any = [];
  usuario: any;
  prodCantidad: number;
  total: number;
  //Utilizado para agregar un nuevo ejemplar
  item: any;

  constructor(
    private cartContext: CartContextService,
    private booksContext: BooksContextService,
    private booksService: BooksService,
    private salesService: SalesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.sourceEjemplares = data.ejemplares;
    this.usuario = data.usuario;
    this.prodCantidad = this.sourceEjemplares.length;
    this.setTotal();
    this.getGroupCart();
  }

  ngOnInit() {}

  openSaleCore() {
    const dialogRef = this.dialog.open(SaleCoreComponent, {
      width: "1020px",
      data: {
        ejemplares: this.ejemplares,
        sourceEjemplares: this.sourceEjemplares,
        usuario: this.usuario,
        subtotal: this.total,
        prodCantidad: this.prodCantidad
      }
    });
    this.onNoClick();
    dialogRef.afterClosed().subscribe(result => {
      this.getAllEjemplares();
    });
  }

  setTotal() {
    this.total = 0;
    this.sourceEjemplares.map(ejemplar => {
      this.total = this.total + ejemplar.libro.precio;
    });
  }

  //Actualizar el contexto actual
  getEjemplares() {
    this.booksService.listarEjemplares().subscribe(
      result => {
        this.booksContext.setEjemplares(result);
      },
      error => {
        console.error(JSON.stringify(error));
      }
    );
  }

  //Obtener los ejemplares agrupados
  getGroupCart() {
    this.salesService.groupCart(this.usuario.usuarioID).subscribe(
      result => {
        this.ejemplares = result;

        this.setCantidadEjemplares();
      },
      error => {
        console.error(JSON.stringify(error));
      }
    );
  }

  //Obtener todas las líneas de venta del usuario
  getAllEjemplares() {
    this.salesService.myCart(this.usuario.usuarioID).subscribe(
      result => {
        this.cartContext.setCart(result);
        this.cartContext.currentCart.subscribe(
          item => {
            this.sourceEjemplares = result;
            this.prodCantidad = item.length;
            this.setTotal();
          },
          errorCart => {
            console.error(JSON.stringify(errorCart));
          }
        );
        this.prodCantidad = this.sourceEjemplares.length;
      },
      error => {
        console.error(JSON.stringify(error));
      }
    );
  }

  //Método para asignar la cantidad de ejemplares en una linea de venta
  setCantidadEjemplares() {
    this.ejemplares.map(ejemplar => {
      this.salesService
        .countCart(this.usuario.usuarioID, ejemplar.libro.isbn)
        .subscribe(
          result => {
            ejemplar.cantidad = result;
          },
          error => {
            console.error(JSON.stringify(error));
          }
        );
    });
  }

  addEjemplar(ejemplar: any) {
    let isbn = ejemplar.libro.isbn;
    this.salesService.addOneEjemplar(isbn).subscribe(
      result => {
        this.item = result;
        if (this.item !== null) {
          this.salesService.addItemCarrito(this.item.ejemplarID).subscribe(
            result => {
              this.snackBar.open("Agregaste un ejemplar!", "VOLVER", {
                duration: 2000
              });
              this.getAllEjemplares();
              this.getGroupCart();
              this.getEjemplares();
            },
            error => {
              console.error(JSON.stringify(error));
            }
          );
        } else {
          this.snackBar.open("No hay ejemplares disponibles!", "VOLVER", {
            duration: 2000
          });
        }
      },
      error => {
        console.error(JSON.stringify(error));
      }
    );
  }

  removeEjemplar(ejemplar: any) {
    this.salesService.removeEjemplar(ejemplar.ejemplarID).subscribe(
      result => {
        this.snackBar.open("Quitaste un ejemplar!", "VOLVER", {
          duration: 2000
        });
        this.getAllEjemplares();
        this.getGroupCart();
        this.getEjemplares();
      },
      error => {
        console.error(JSON.stringify(error));
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
