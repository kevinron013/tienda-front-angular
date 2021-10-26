import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from "@angular/material";
import { SalesService } from "../../services/sales/sales.service";

@Component({
  selector: "app-int-sales",
  templateUrl: "./int-sales.component.html",
  styleUrls: ["./int-sales.component.sass"]
})
export class IntSalesComponent implements OnInit {
  displayedColumns: string[] = ["position", "fecha", "cliente", "opciones"];

  ventas: any = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog, public salesService: SalesService) {
    this.getSales();
  }

  ngOnInit() {}

  getSales() {
    this.salesService.getIntraSales().subscribe(
      result => {
        this.ventas = result;
        this.dataSource = new MatTableDataSource<any>(this.ventas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error(JSON.stringify(error));
      }
    );
  }

  aplicarFiltro(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
