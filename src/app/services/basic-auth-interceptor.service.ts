import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BasicAuthInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem("user") && localStorage.getItem("basicauth")) {
      req = req.clone({
        setHeaders: {
          Authorization: localStorage.getItem("basicauth")
        }
      });
    }

    return next.handle(req);
  }
}
