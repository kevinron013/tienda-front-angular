import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";

@Component({
  selector: "app-book-detail",
  templateUrl: "./book-detail.component.html",
  styleUrls: ["./book-detail.component.sass"],
})
export class BookDetailComponent implements OnInit {
  libro: any;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<BookDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.libro = data.libro;
  }

  ngOnInit() {}

  onNoClick() {
    this.dialogRef.close();
  }
}
