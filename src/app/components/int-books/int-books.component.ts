import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { BooksService } from "src/app/services/books/books.service";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
  MatSnackBar,
} from "@angular/material";
import {
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
  Form,
  FormControl,
} from "@angular/forms";
import { FirebaseStorageService } from "../../services/firebase/firebase-storage.service";
import { CategoriesService } from "src/app/services/categories/categories.service";

@Component({
  selector: "app-int-books",
  templateUrl: "./int-books.component.html",
  styleUrls: ["./int-books.component.sass"],
})
export class IntBooksComponent implements OnInit {
  displayedColumns: string[] = [
    "position",
    "titulo",
    "autor",
    "fechapub",
    "isbn",
    "stock",
    "categoria",
    "precio",
    "estado",
    "opciones",
  ];
  books: any = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private bookService: BooksService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.getBooks();
  }

  ngOnInit() {}

  getBooks() {
    this.bookService.listarLibros().subscribe(
      (result) => {
        this.books = result;
        this.books.map((book) => {
          this.bookService.getLibroEjemplares(book.libroID).subscribe(
            (result) => {
              book["ejemplares"] = result;
            },
            (error) => {
              console.error(JSON.stringify(error));
            }
          );
        });
        this.dataSource = new MatTableDataSource<any>(this.books);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error(JSON.stringify(error));
      }
    );
  }

  aplicarFiltro(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  openAddEjemplarDialog(_id: number, _titulo: string) {
    let action = "VOLVER";
    const dialogRef = this.dialog.open(DialogAddEjemplarDialog, {
      width: "550px",
      data: { libroID: _id, titulo: _titulo },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        result === 1
          ? this.snackBar.open("Agregaste " + result + " ejemplar!", action, {
              duration: 2000,
            })
          : this.snackBar.open("Agregaste " + result + " ejemplares!", action, {
              duration: 2000,
            });
      }

      this.getBooks();
    });
  }
  openEjemplaresDialog(_ejemplares: any) {
    const dialogRef = this.dialog.open(DialogEjemplaresDialog, {
      width: "550px",
      data: { ejemplares: _ejemplares },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.getBooks();
    });
  }

  openEditLibroDialog(_libro: any) {
    const dialogRef = this.dialog.open(DialogEditarLibroDialog, {
      width: "720px",
      data: { libro: _libro },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getBooks();
    });
  }
}

//Modal para agregar ejemplar
@Component({
  selector: "dialog-add-ejemplar-dialog",
  templateUrl: "dialog-add-ejemplar-dialog.html",
})
export class DialogAddEjemplarDialog implements OnInit {
  dynamicForm: FormGroup;
  submitted = false;
  items: FormArray;
  libro: any;

  constructor(
    private formBuilder: FormBuilder,
    private booksService: BooksService,
    public dialogRef: MatDialogRef<DialogAddEjemplarDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.libro = data;
  }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      nEjemplares: ["", Validators.required],
      items: new FormArray([]),
    });
  }

  get f() {
    return this.dynamicForm.controls;
  }
  get e() {
    return this.f.items as FormArray;
  }

  createForm(e: any) {
    const nEjemplares = e.target.value || 0;
    if (this.e.length < nEjemplares) {
      for (let i = this.e.length; i < nEjemplares; i++) {
        this.e.push(
          this.formBuilder.group({
            sku: ["", [Validators.required, Validators.minLength(12)]],
          })
        );
      }
    } else {
      for (let i = this.e.length; i >= nEjemplares; i--) {
        this.e.removeAt(i);
      }
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.dynamicForm.invalid) {
      return;
    }

    let result = this.dynamicForm.value;

    let ejemplares = result.items;

    ejemplares.map((ejemplar) => {
      ejemplar["libro"] = this.libro;
    });

    this.booksService.agregarEjemplares(ejemplares).subscribe(
      (result) => {
        console.log("success");
      },
      (error) => {
        console.error(JSON.stringify(error));
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
//Modal para ver los ejemplares de un libro
@Component({
  selector: "dialog-ejemplares-dialog",
  templateUrl: "dialog-ejemplares-dialog.html",
})
export class DialogEjemplaresDialog implements OnInit {
  displayedColumns: string[] = ["position", "sku", "estado"];
  color = "primary";
  ejemplares: any = [];
  newEjemplares: any = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public bookService: BooksService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogEjemplaresDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ejemplares = data.ejemplares;
  }

  ngOnInit() {
    this.getEjemplares();
  }

  isChecked(element: any) {
    if (element.estado === "Inactivo") {
      return false;
    } else if (element.estado === "Activo") {
      return true;
    }
  }

  getEjemplares() {
    this.dataSource = new MatTableDataSource<any>(this.ejemplares);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  actualizarEjemplar(e, ejemplar: any) {
    let ejemplaresAux = [];

    if (e.checked) {
      ejemplar.estado = "Activo";
    } else {
      ejemplar.estado = "Inactivo";
    }

    //Cambiar el estado de los objetos en el arreglo
    if (this.newEjemplares.length !== 0) {
      this.newEjemplares.map((item) => {
        if (item.sku !== ejemplar.sku) {
          this.newEjemplares.push(ejemplar);
        }
      });
    } else {
      this.newEjemplares.push(ejemplar);
    }
  }

  deleteEjemplar() {
    this.bookService.deleteEjemplar(this.newEjemplares).subscribe(
      (result) => {
        this.snackBar.open("Ejemplares actualizados!", "VOLVER", {
          duration: 2000,
        });
      },
      (error) => {
        this.snackBar.open("Ups! Algo salió mal", "VOLVER", {
          duration: 2000,
        });
      }
    );
  }

  aplicarFiltro(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

//Modal para editar libro
@Component({
  selector: "dialog-editar-libro-dialog",
  templateUrl: "dialog-editar-libro-dialog.html",
})
export class DialogEditarLibroDialog implements OnInit {
  form: FormGroup;
  submitted = false;
  libro: any = {
    libroID: "",
    autor: "",
    fechaPublicacion: "",
    isbn: "",
    precio: "",
    stock: "",
    titulo: "",
    categoria: {
      categoriaID: "",
    },
    estado: "",
    portada: {
      url: "",
      portadaID: "",
      estado: "",
      nombrePortada: "",
    },
  };
  portada: any = {
    url: "",
    portadaID: "",
    estado: "",
    nombrePortada: "",
  };
  categoria: any = {
    categoriaID: "",
  };
  portadaID: any;
  categorias: any = [];
  color = "primary";

  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });

  mensajeArchivo = "No hay un archivo seleccionado";
  datosFormulario = new FormData();
  nombreArchivo = "";
  URLPublica = "";
  finalizado = false;
  showPreview = false;

  //PROGRESS
  porcentaje = 0;
  mode = "indeterminate";
  isProgress = false;
  diameter = "40";

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private booksService: BooksService,
    private firebaseStorage: FirebaseStorageService,
    private categoriesService: CategoriesService,
    public dialogRef: MatDialogRef<DialogEditarLibroDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getCategories();
    this.libro = data.libro;
    this.form = this.formBuilder.group({
      titulo: [this.libro.titulo, Validators.required],
      autor: [this.libro.autor, Validators.required],
      fechaPublicacion: [this.libro.fechaPublicacion, Validators.required],
      isbn: [this.libro.isbn, Validators.required],
      precio: [
        this.libro.precio,
        Validators.compose([
          Validators.required,
          Validators.pattern(`[0-9]+(\\.[0-9][0-9]?)?`),
        ]),
      ],
      categoriaID: [this.libro.categoria.categoriaID, Validators.required],
    });
  }

  ngOnInit() {}

  get f() {
    return this.form.controls;
  }

  isChecked() {
    if (this.libro.estado === "Inactivo") {
      return false;
    } else if (this.libro.estado === "Activo") {
      return true;
    }
  }

  getCategories() {
    this.categoriesService.listCategories().subscribe(
      (result) => {
        this.categorias = result;
      },
      (error) => {
        console.error(JSON.stringify(error));
      }
    );
  }

  cambioArchivo(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete("archivo");
        this.datosFormulario.append(
          "archivo",
          event.target.files[i],
          event.target.files[i].name
        );
      }

      this.subirArchivo();
    } else {
      this.mensajeArchivo = "No hay un archivo seleccionado";
    }
  }

  subirArchivo() {
    let archivo = this.datosFormulario.get("archivo");

    let referencia = this.firebaseStorage.refPortada(this.nombreArchivo);

    let verifyFile;

    referencia.getDownloadURL().subscribe((URL) => {
      verifyFile = URL;
    });

    if (verifyFile !== null) {
      let tarea = this.firebaseStorage.uploadPortada(
        this.nombreArchivo,
        archivo
      );

      //Cambia el porcentaje
      tarea.percentageChanges().subscribe((porcentaje) => {
        this.isProgress = true;
        this.porcentaje = Math.round(porcentaje);
        if (this.porcentaje == 100) {
          this.finalizado = true;
          this.isProgress = false;
        }
      });
    } else {
      this.finalizado = true;
    }

    this.addPortada();
  }

  setShowPreview() {
    this.getReference();
    this.showPreview = !this.showPreview;
  }

  getReference() {
    let referencia = this.firebaseStorage.refPortada(this.nombreArchivo);

    const sub = referencia.getDownloadURL().subscribe(
      (URL) => {
        this.URLPublica = URL;
      },
      (error) => {
        console.error(JSON.stringify(error));
      }
    );
  }

  actualizarLibro(e) {
    if (e.checked) {
      this.libro.estado = "Activo";
    } else {
      this.libro.estado = "Inactivo";
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.categoria["categoriaID"] = this.form.value.categoriaID;
    this.libro.autor = this.form.value.autor;
    this.libro.fechaPublicacion = this.form.value.fechaPublicacion;
    this.libro.isbn = this.form.value.isbn;
    this.libro.precio = this.form.value.precio;
    this.libro.titulo = this.form.value.titulo;

    delete this.libro.categoriaID;
    this.libro.categoria = this.categoria;

    this.addPortada();

    this.booksService.findPortadaByName(this.portada).subscribe(
      (result) => {
        this.libro.portada = result;

        this.booksService.editLibro(this.libro).subscribe(
          (result) => {
            let action = "VOLVER";
            this.dialogRef.close();
            this.snackBar.open("Libro editado!", action, {
              duration: 2000,
            });
          },
          (error) => {
            console.error(JSON.stringify(error));
          }
        );
      },
      (error) => {
        console.error(JSON.stringify(error));
      }
    );
  }

  addPortada() {
    this.getReference();
    this.portada["url"] = this.URLPublica;
    this.portada["nombrePortada"] = this.nombreArchivo;
    this.portada["estado"] = "Activo";
    this.booksService.addPortada(this.portada).subscribe(
      (result) => {
        console.log(result);
      },

      (error) => {
        console.error(JSON.stringify(error));
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
