import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort } from "@angular/material";
import { SalesService } from "../../services/sales/sales.service";

@Component({
  selector: "app-sale-detail",
  templateUrl: "./sale-detail.component.html",
  styleUrls: ["./sale-detail.component.sass"]
})
export class SaleDetailComponent implements OnInit {
  @Input() ejemplares: any;
  @Input() usuario: any;

  displayedColumns: string[] = [
    "position",
    "titulo",
    "autor",
    "isbn",
    "precio",
    "cantidad"
  ];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private salesService: SalesService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.ejemplares);
    this.dataSource.sort = this.sort;
    this.setCantidadEjemplares();
  }

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
}
