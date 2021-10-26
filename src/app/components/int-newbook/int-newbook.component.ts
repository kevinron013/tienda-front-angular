import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { FirebaseStorageService } from "../../services/firebase/firebase-storage.service";
import { CategoriesService } from "src/app/services/categories/categories.service";
import { BooksService } from "src/app/services/books/books.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-int-newbook",
  templateUrl: "./int-newbook.component.html",
  styleUrls: ["./int-newbook.component.sass"],
})
export class IntNewbookComponent implements OnInit {
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
    private categoriesService: CategoriesService
  ) {
    this.getCategories();
    this.form = this.formBuilder.group({
      titulo: ["", Validators.required],
      autor: ["", Validators.required],
      fechaPublicacion: ["", Validators.required],
      isbn: ["", Validators.required],
      precio: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(`[0-9]+(\\.[0-9][0-9]?)?`),
        ]),
      ],
      categoriaID: ["", Validators.required],
    });
  }

  ngOnInit() {}

  get f() {
    return this.form.controls;
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

  onReset() {
    this.submitted = false;
    this.form.reset();
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

        this.booksService.addLibro(this.libro).subscribe(
          (result) => {
            let action = "VOLVER";
            this.snackBar.open("Libro agregado!", action, {
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

  onNoClick(): void {}

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
}
