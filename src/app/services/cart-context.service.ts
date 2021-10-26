import { Injectable } from "@angular/core";
import { SalesService } from "../services/sales/sales.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CartContextService {
  user: any = JSON.parse(localStorage.getItem("user"));
  private cartSource: any = new BehaviorSubject([]);
  currentCart = this.cartSource.asObservable();

  constructor(private salesService: SalesService) {
    if(this.user !== null){
      this.myCart(this.user.usuarioID);
    }
  }

  setCart(cart: any) {
    this.cartSource.next(cart);
  }

  myCart(userID: number) {
    this.salesService.myCart(userID).subscribe(
      result => {
        this.cartSource.next(result);
      },
      error => {
        console.error(JSON.stringify(error));
      }
    );
  }
}
