import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
  MatSnackBar
} from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SalesService } from "../../services/sales/sales.service";
import { BooksService } from "../../services/books/books.service";
import { CartContextService } from "../../services/cart-context.service";
import { BooksContextService } from "../../services/books-context.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sale-core",
  templateUrl: "./sale-core.component.html",
  styleUrls: ["./sale-core.component.sass"]
})
export class SaleCoreComponent implements OnInit {
  //Para receptor
  form: FormGroup;
  submitted = false;
  receptor: any;
  //Para sale-detail
  sourceEjemplares: any = [];
  ejemplares: any = [];
  usuario: any;
  subtotal: number;
  prodCantidad: number;
  userSale: any;

  constructor(private router: Router,
    private cartContext: CartContextService,
    private booksContext: BooksContextService,
    private booksService: BooksService,
    private salesService: SalesService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<SaleCoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.sourceEjemplares = data.sourceEjemplares;
    this.ejemplares = data.ejemplares;
    this.usuario = data.usuario;
    this.subtotal = data.subtotal;
    this.prodCantidad = data.prodCantidad;

    this.form = formBuilder.group({
      dni: ["", [Validators.required, Validators.minLength(8)]],
      apellido: ["", Validators.required],
      nombre: ["", Validators.required],
      telefono: ["", Validators.required]
    });
  }

  ngOnInit() {}

  getBooks() {
    this.booksService.listarEjemplares().subscribe(
      result => {
        this.booksContext.setEjemplares(result);
      },
      error => {
        console.error(JSON.stringify(error));
      }
    );
  }

  getNewCart() {
    this.salesService.myCart(this.usuario.usuarioID).subscribe(
      result => {
        this.cartContext.setCart(result);
      },
      error => {
        console.error(JSON.stringify(error));
      }
    );
  }

  get f() {
    return this.form.controls;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.receptor = this.form.value;
  }

  doSale() {
    this.onSubmit();
    this.salesService.mySale(this.usuario.usuarioID).subscribe(
      result => {
        this.userSale = result;
        this.salesService
          .addReceptor(this.receptor, this.userSale.ventaID)
          .subscribe(
            result => {
              console.log("Se agregó receptor con éxito");
            },
            error => {
              console.error(JSON.stringify(error));
            }
          );
      },
      error => {
        console.error(JSON.stringify(error));
      }
    );

    this.salesService.mySale(this.usuario.usuarioID).subscribe(
      result => {
        this.userSale = result;
        this.salesService.doSale(this.userSale, this.subtotal).subscribe(
          result => {
            this.toastr.info("Pago", "Realizar pago");
            this.router.navigate(["/pay"]);
            localStorage.setItem("subtotal",this.subtotal as undefined);
            /*this.toastr.info("Continúa comprando", "Venta realizada con éxito");
            this.sourceEjemplares.map(ejemplar => {
              ejemplar.estado = "Vendido";
            });
            this.booksService.deleteEjemplar(this.sourceEjemplares).subscribe(
              data => {
                console.log("Se actualizaron los ejemplares");
                this.getBooks();
                this.getNewCart();
              },
              error => {
                console.error(JSON.stringify(error));
              }
            );*/

          },
          error => {
            console.error(JSON.stringify(error));
          }
        );
      },
      error => {
        console.error(JSON.stringify(error));
      }
    );

    this.sourceEjemplares.map(ejemplar => {
      ejemplar.estado = "Vendido";
    });

    
  }
}
