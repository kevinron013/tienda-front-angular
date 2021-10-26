import { Component, OnInit } from "@angular/core";
import { BooksService } from "../../services/books/books.service";
import { CategoriesService } from "../../services/categories/categories.service";
import { BooksContextService } from "../../services/books-context.service";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.sass"]
})
export class BooksComponent implements OnInit {
  ejemplares: any = [];
  booksLength: number;

  categories: any = [];
  categoriesLength: number;

  breakpoint: number;
  rowHeight: string;

  constructor(
    private booksService: BooksService,
    private categoriesService: CategoriesService,
    private booksContext: BooksContextService
  ) {}

  ngOnInit() {
    if (window.innerWidth <= 900) {
      this.breakpoint = 1;
    } else if (window.innerWidth <= 1100) {
      this.breakpoint = 2;
    } else {
      this.breakpoint = 4;
    }

    this.rowHeight = window.innerWidth <= 900 ? "1:1.2" : "1:1.5";
    this.listCategories();
  }

  listCategories() {
    this.categoriesService.categoriesMain().subscribe(value => {
      this.categories = value;
      this.categoriesLength = this.categories.length;
    });

    this.booksContext.currentEjemplares.subscribe(
      value => {
        this.ejemplares = value;
        this.booksLength = this.ejemplares.length;
        /*Seccionar por las categorias que tengan
         mayor cantiad de productos (establecer un máximo = 8)
        */
      },
      error => {
        console.error(JSON.stringify(error));
      }
    );
  }

  onResize(event: any) {
    if (event.target.innerWidth <= 900) {
      this.breakpoint = 1;
    } else if (event.target.innerWidth <= 1100) {
      this.breakpoint = 2;
    } else {
      this.breakpoint = 4;
    }
    this.rowHeight = event.target.innerWidth <= 900 ? "1:1.2" : "1:1.5";
  }
}
