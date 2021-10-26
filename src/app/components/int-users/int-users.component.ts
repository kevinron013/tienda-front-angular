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
import { FirebaseStorageService } from "../../services/firebase/firebase-storage.service";
import { UsersService } from "src/app/services/users/users.service";
import { MustMatch } from "../../_helpers/must-match.validator";

@Component({
  selector: "app-int-users",
  templateUrl: "./int-users.component.html",
  styleUrls: ["./int-users.component.sass"]
})
export class IntUsersComponent implements OnInit {
  displayedColumns: string[] = [
    "position",
    "nombres",
    "apellidos",
    "sexo",
    "phone",
    "email",
    "estado",
    "tipoUsuario",
    "opciones"
  ];
  users: any = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private userService: UsersService, public dialog: MatDialog) {
    this.getUsers();
  }

  ngOnInit() {}

  getUsers() {
    this.userService.getUsers().subscribe(
      result => {
        this.users = result;
        this.dataSource = new MatTableDataSource<any>(this.users);
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

  openEditUsuarioDialog(_user: any) {
    const dialogRef = this.dialog.open(DialogEditarUsuarioDialog, {
      width: "720px",
      data: { user: _user }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }
}

//Modal para editar usuario
@Component({
  selector: "dialog-editar-usuario-dialog",
  templateUrl: "dialog-editar-usuario-dialog.html"
})
export class DialogEditarUsuarioDialog implements OnInit {
  form: FormGroup;
  submitted = false;
  usuario: any = {
    usuarioID: "",
    apellido: "",
    nombre: "",
    email: "",
    usrPassword: "",
    estado: "",
    sexo: "",
    telefono: "",
    tipoUsuario: {
      tipoUsuarioID: ""
    },
    avatar: {
      avatarID: ""
    }
  };
  tiposUsuario: any = [];
  avatar: any = {
    url: "",
    avatarID: "",
    estado: "",
    nombreAvatar: ""
  };
  sexos: any = ["Masculino", "Femenino"];
  color = "primary";

  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required)
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
    private userService: UsersService,
    private firebaseStorage: FirebaseStorageService,
    public dialogRef: MatDialogRef<DialogEditarUsuarioDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getTiposUsuario();
    this.usuario = data.user;
    this.form = this.formBuilder.group({
      apellido: [this.usuario.apellido, Validators.required],
      nombre: [this.usuario.nombre, Validators.required],

      sexo: [this.usuario.sexo, Validators.required],

      telefono: [this.usuario.telefono, Validators.required],
      tipoUsuarioID: ["", Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {}

  getTiposUsuario() {
    this.userService.getTiposUsuario().subscribe(
      result => {
        this.tiposUsuario = result;
      },
      error => {
        console.error(JSON.stringify(error));
      }
    );
  }

  get f() {
    return this.form.controls;
  }

  isChecked() {
    if (this.usuario.estado === "Inactivo") {
      return false;
    } else if (this.usuario.estado === "Activo") {
      return true;
    }
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

    let referencia = this.firebaseStorage.refAvatar(this.nombreArchivo);

    let verifyFile;

    referencia.getDownloadURL().subscribe(URL => {
      verifyFile = URL;
    });

    if (verifyFile !== null) {
      let tarea = this.firebaseStorage.uploadAvatar(
        this.nombreArchivo,
        archivo
      );

      //Cambia el porcentaje
      tarea.percentageChanges().subscribe(porcentaje => {
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

    this.addAvatar();
  }

  setShowPreview() {
    this.getReference();
    this.showPreview = !this.showPreview;
  }

  getReference() {
    let referencia = this.firebaseStorage.refAvatar(this.nombreArchivo);

    const sub = referencia.getDownloadURL().subscribe(
      URL => {
        this.URLPublica = URL;
      },
      error => {
        console.error(JSON.stringify(error));
      }
    );
  }

  actualizarUsuario(e) {
    if (e.checked) {
      this.usuario.estado = "Activo";
    } else {
      this.usuario.estado = "Inactivo";
    }
  }

  addAvatar() {
    this.getReference();
    this.avatar.url = this.URLPublica;
    this.avatar.nombreAvatar = this.nombreArchivo;
    this.avatar.estado = "Activo";
    this.userService.addAvatar(this.avatar).subscribe(
      result => {
        console.log(result);
      },

      error => {
        console.error(JSON.stringify(error));
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.usuario.nombre = this.form.value.nombre;
    this.usuario.apellido = this.form.value.apellido;
    this.usuario.email = this.form.value.email;
    this.usuario.sexo = this.form.value.sexo;
    this.usuario.telefono = this.form.value.telefono;
    this.usuario.tipoUsuario.tipoUsuarioID = this.form.value.tipoUsuarioID;

    this.addAvatar();

    this.userService.findAvatarByName(this.avatar).subscribe(
      result => {
        if (result !== null) {
          this.usuario.avatar = result;
        }
        console.log(this.usuario);

        this.userService.editUser(this.usuario).subscribe(
          result => {
            let action = "VOLVER";
            this.dialogRef.close();
            this.snackBar.open("Usuario editado!", action, {
              duration: 2000
            });
          },
          error => {
            console.error(JSON.stringify(error));
          }
        );
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
