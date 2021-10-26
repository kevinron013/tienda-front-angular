import { Component, OnInit } from "@angular/core";
import { ShouldShowHMaterialService } from "../../../services/should-show-hmaterial.service";

@Component({
  selector: "app-ext-header",
  templateUrl: "./ext-header.component.html",
  styleUrls: ["./ext-header.component.sass"]
})
export class ExtHeaderComponent implements OnInit {
  state: Boolean = true;

  constructor(private stateContext: ShouldShowHMaterialService) {}

  ngOnInit() {
    this.stateContext.currentState.subscribe(
      result => {
        this.state = result;
      },
      error => {
        console.error(JSON.stringify(error));
      }
    );
  }
}
