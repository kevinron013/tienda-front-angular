import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { headers } from "../../../headers.js";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SalesService {
  user: any;

  constructor(private httpClient: HttpClient) {}

  //Métodos para la venta

  mySale(userID: number) {
    return this.httpClient.get(`api/sales/mySale/${userID}`, {
      headers: headers
    });
  }

  doSale(sale: any, subtotal: number) {
    return this.httpClient.put(
      `api/sales/doSale/${subtotal}`,
      sale,
      {
        headers: headers
      }
    );
  }

  addReceptor(receptor: any, ventaID: number) {
    return this.httpClient.post(
      `api/sales/addReceptor/${ventaID}`,
      receptor,
      {
        headers: headers
      }
    );
  }

  //Métodos para el carrito

  addItemCarrito(ejemplarID: number) {
    this.user = JSON.parse(localStorage.getItem("user"));

    return this.httpClient.get(
      `api/sales/agregarCarrito/${this.user.usuarioID}/${ejemplarID}`,
      {
        headers: headers
      }
    );
  }

  myCart(userID: number) {
    return this.httpClient.get(`api/sales/${userID}/myCart`);
  }

  groupCart(userID: number) {
    return this.httpClient.get(
      `api/sales/${userID}/groupCart`,
      {
        headers: headers
      }
    );
  }

  countCart(userID: number, isbn: String) {
    return this.httpClient.get(
      `api/sales/${userID}/${isbn}/countCart`,
      {
        headers: headers
      }
    );
  }

  addOneEjemplar(isbn: String) {
    return this.httpClient.get(
      `api/sales/${isbn}/oneEjemplar`,
      {
        headers: headers
      }
    );
  }

  removeEjemplar(ejemplarID: String) {
    return this.httpClient.put(
      `api/sales/removeItem/${ejemplarID}`,
      {
        headers: headers
      }
    );
  }

  //Para el mantenedor de ventas

  getIntraSales() {
    return this.httpClient.get(`api/admin/listaVentas`, {
      headers: headers
    });
  }
}
