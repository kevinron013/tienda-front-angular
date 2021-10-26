import { Injectable } from "@angular/core";
import { BooksService } from "./books/books.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BooksContextService {
  private ejemplaresSource: any = new BehaviorSubject([]);
  currentEjemplares = this.ejemplaresSource.asObservable();

  constructor(private booksService?: BooksService) {
    this.getEjemplares();
  }

  setEjemplares(ejemplares: any) {
    this.ejemplaresSource.next(ejemplares);
  }

  getEjemplares() {
    this.booksService.listarEjemplares().subscribe(
      result => {
        this.ejemplaresSource.next(result);
      },
      error => {
        console.error(JSON.stringify(error));
      }
    );
  }
}
