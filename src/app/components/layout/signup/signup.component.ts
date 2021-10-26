import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { UsersService } from "src/app/services/users/users.service";
import { MustMatch } from "src/app/_helpers/must-match.validator";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.sass"],
})
export class SignupComponent implements OnInit {
  hide: boolean;

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
      tipoUsuarioID: "1",
    },
  };
  sexos: any = ["Masculino", "Femenino"];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.formBuilder.group(
      {
        apellido: [this.usuario.apellido, Validators.required],
        nombre: [this.usuario.nombre, Validators.required],

        sexo: [this.usuario.sexo, Validators.required],

        telefono: [
          this.usuario.telefono,
          [Validators.required, Validators.maxLength(9)],
        ],
        email: [this.usuario.email, [Validators.required, Validators.email]],
        usrPassword: [
          this.usuario.usrPassword,
          [Validators.required, Validators.minLength(6)],
        ],
      }
    );
  }

  ngOnInit() { }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
  
    if (this.form.invalid) {
      return;
    }

    this.usuario.nombre = this.form.value.nombre;
    this.usuario.apellido = this.form.value.apellido;
    this.usuario.email = this.form.value.email;
    this.usuario.usrPassword = this.form.value.usrPassword;
    this.usuario.sexo = this.form.value.sexo;
    this.usuario.telefono = this.form.value.telefono;
    this.usuario.tipoUsuario.tipoUsuarioID = this.form.value.tipoUsuarioID;

    const action = "VOLVER";

    this.userService.addUser(this.usuario).subscribe(
      (result) => {
        this.snackBar
          .open("Usuario registrado!", action, {
            duration: 2000,
          })
          .onAction()
          .subscribe(() => {
            this.router.navigateByUrl("/");
          });
      },
      (error) => {
        this.snackBar.open("Error!", action, {
          duration: 2000,
        });
      }
    );
  }
}
