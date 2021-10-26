import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
  MatSnackBar
} from "@angular/material";
import {
  FormGroup,
  FormBuilder,
  Validators,
  Form,
  FormControl
} from "@angular/forms";

import { CategoriesService } from "src/app/services/categories/categories.service";

@Component({
  selector: "app-int-categories",
  templateUrl: "./int-categories.component.html",
  styleUrls: ["./int-categories.component.sass"]
})
export class IntCategoriesComponent implements OnInit {
  displayedColumns: string[] = [
    "position",
    "nombreCategoria",
    "estado",
    "opciones"
  ];
  categories: any = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private categorieService: CategoriesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.getCategories();
  }

  ngOnInit() {}

  getCategories() {
    this.categorieService.listCategories().subscribe(
      result => {
        this.categories = result;
        this.dataSource = new MatTableDataSource<any>(this.categories);
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

  openEditCategorieDialog(_categorie: any) {
    const dialogRef = this.dialog.open(DialogEditCategorieDialog, {
      width: "720px",
      data: { categorie: _categorie }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCategories();
    });
  }

  openNewCategorieDialog() {
    const dialogRef = this.dialog.open(DialogNewCategorieDialog, {
      width: "720px"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCategories();
    });
  }
}

//Modal para editar categoria
@Component({
  selector: "dialog-edit-categoria-dialog",
  templateUrl: "dialog-edit-categoria-dialog.html"
})
export class DialogEditCategorieDialog implements OnInit {
  form: FormGroup;
  submitted = false;

  categoria: any;
  color = "primary";

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    public dialogRef: MatDialogRef<DialogEditCategorieDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.categoria = data.categorie;
    this.form = this.formBuilder.group({
      nombreCategoria: [this.categoria.nombreCategoria, Validators.required]
    });
  }

  ngOnInit() {}

  get f() {
    return this.form.controls;
  }

  isChecked() {
    if (this.categoria.estado === "Inactivo") {
      return false;
    } else if (this.categoria.estado === "Activo") {
      return true;
    }
  }

  actualizarCategoria(e) {
    if (e.checked) {
      this.categoria.estado = "Activo";
    } else {
      this.categoria.estado = "Inactivo";
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.categoria.nombreCategoria = this.form.value.nombreCategoria;

    this.categoriesService.editCategorie(this.categoria).subscribe(
      result => {
        let action = "VOLVER";
        this.onNoClick();
        this.snackBar.open("Categoria editada!", action, {
          duration: 2000
        });
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

//Modal para agregar categoria
@Component({
  selector: "dialog-new-categoria-dialog",
  templateUrl: "dialog-new-categoria-dialog.html"
})
export class DialogNewCategorieDialog implements OnInit {
  form: FormGroup;
  submitted = false;

  categoria: any;
  color = "primary";

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    public dialogRef: MatDialogRef<DialogNewCategorieDialog>
  ) {
    this.form = this.formBuilder.group({
      nombreCategoria: ["", Validators.required]
    });
  }

  ngOnInit() {}

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.categoria = this.form.value;

    this.categoriesService.newCategorie(this.categoria).subscribe(
      result => {
        let action = "VOLVER";
        this.onNoClick();
        this.snackBar.open("Categoria agregada!", action, {
          duration: 2000
        });
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
