import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { SalesService } from "../../../services/sales/sales.service";
import { CartContextService } from "../../../services/cart-context.service";

@Component({
  selector: "app-ext-app-layout",
  templateUrl: "./ext-app-layout.component.html",
  styleUrls: ["./ext-app-layout.component.sass"]
})
export class ExtAppLayoutComponent implements OnInit {
  user: any;
  cart: any = [];
  myCart: any = [];
  welcomeName: String;

  constructor(
    private cartContext: CartContextService,
    private toastr: ToastrService,
    private salesService: SalesService
  ) {
    this.user = JSON.parse(localStorage.getItem("user"));

    if (this.user !== null) {
      this.welcomeName = this.user.nombre.split(" ", 1);
      this.getMyCart();
      this.toastr.info(
        "¿Buscas algo nuevo para leer?",
        "¡Hola! " + this.welcomeName + "."
      );
    } else {
      this.toastr.info("Inicia sesión para poder comprar", "¡Bienvenido!");
    }
  }

  ngOnInit() {}

  getMyCart() {
    this.salesService.myCart(this.user.usuarioID).subscribe(
      result => {
        this.cartContext.setCart(result);
      },
      error => {
        console.error(JSON.stringify(error));
      }
    );
  }
}
