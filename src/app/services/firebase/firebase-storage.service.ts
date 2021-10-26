import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";

@Injectable({
  providedIn: "root"
})
export class FirebaseStorageService {
  constructor(private storage: AngularFireStorage) {}

  public uploadPortada(nombreArchivo: string, datos: any) {
    return this.storage.upload("Books/" + nombreArchivo, datos);
  }

  public refPortada(nombreArchivo: any) {
    return this.storage.ref("Books/" + nombreArchivo);
  }

  public uploadAvatar(nombreArchivo: string, datos: any) {
    return this.storage.upload("Users/" + nombreArchivo, datos);
  }

  
  public refAvatar(nombreArchivo: any) {
    return this.storage.ref("Users/" + nombreArchivo);
  }
}
