import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { headers } from "../../../headers.js";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BooksService {
  constructor(private httpClient: HttpClient) {}

  listarEjemplares() {
    return this.httpClient.get(`api/books/mainEjemplares`, {
      headers: headers
    });
  }

  ejemplaresByCategorie(i: number) {
    return this.httpClient.get(`api/books/ejemplaresByCategoria/${i}`, {
      headers: headers
    });
  }

  searchLibros(parameter: String) {
    return this.httpClient.get(`api/books/searchEjemplar/${parameter}`, {
      headers: headers
    });
  }

  verLibro(libroID: number) {
    return this.httpClient.get(`api/books/verLibro/${libroID}`, {
      headers: headers
    });
  }

  listarLibros() {
    return this.httpClient.get("/api/admin/listBooks", {
      headers: headers
    });
  }

  agregarEjemplares(ejemplares: any) {
    let _ejemplares = JSON.stringify(ejemplares);

    return this.httpClient.post("api/admin/addEjemplares", _ejemplares, {
      headers: headers
    });
  }

  addLibro(libro: any) {
    return this.httpClient.post("api/admin/newBook", libro, {
      headers: headers
    });
  }

  editLibro(libro: any) {
    return this.httpClient.put("api/admin/editBook", libro, {
      headers: headers
    });
  }

  getLibroEjemplares(libroID: number) {
    return this.httpClient.get(`api/books/ejemplaresLibro/${libroID}`, {
      headers: headers
    });
  }

  deleteEjemplar(ejemplares: any) {
    return this.httpClient.put(`api/books/deleteEjemplar`, ejemplares, {
      headers: headers
    });
  }

  findPortadaByName(portada: any) {
    return this.httpClient.post("api/books/buscarPortada", portada, {
      headers: headers
    });
  }

  addPortada(portada: any) {
    return this.httpClient.post("api/books/addPortada", portada, {
      headers: headers
    });
  }
}
