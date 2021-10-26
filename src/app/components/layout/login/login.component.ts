import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UsersService } from "../../../services/users/users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  user: any;
  hide: boolean;

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      usrPassword: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.usersService.verificarAcceso(this.form.value).subscribe(
      result => {
        this.user = result;
        console.log(this.user);
        this.user && localStorage.setItem("user", JSON.stringify(this.user));
        let authString =
          "Basic " + btoa(this.user.email + ":" + this.form.value.usrPassword);
        localStorage.setItem("basicauth", authString);
        if (this.user.tipoUsuario.tipoUsuarioID === 1) {
          this.usersService.setIsAdminLog(false);
          this.router.navigateByUrl("");
        } else if (this.user.tipoUsuario.tipoUsuarioID === 2) {
          this.usersService.setIsAdminLog(true);
          this.router.navigateByUrl("admin/books");
        }
      },
      error => {
        console.error(JSON.stringify(error));
      }
    );
  }
}
