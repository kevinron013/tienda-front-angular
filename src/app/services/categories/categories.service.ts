import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { headers } from "../../../headers.js";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  listCategories(): Observable<any> {
    return this.httpClient.get("api/categories/", {
      headers: headers
    });
  }

  getCategoryById(id: number) {
    return this.httpClient.get(`api/categories/categoriaById/${id}`, {
      headers: headers
    });
  }

  categoriesMain(): Observable<any> {
    return this.httpClient.get("api/categories/categoriesMain", {
      headers: headers
    });
  }

  editCategorie(categoria: any) {
    return this.httpClient.put("api/admin/editCategorie", categoria, {
      headers: headers
    });
  }

  newCategorie(categoria: any) {
    return this.httpClient.post("api/admin/newCategorie", categoria, {
      headers: headers
    });
  }
}
