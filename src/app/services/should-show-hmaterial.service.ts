import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ShouldShowHMaterialService {
  private state: any = new BehaviorSubject(true);
  currentState = this.state.asObservable();

  constructor() {}

  setState(state: Boolean) {
    this.state.next(state);
  }
}
