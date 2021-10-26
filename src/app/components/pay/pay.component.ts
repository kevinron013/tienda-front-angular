import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  subtotal = "";
  constructor() { }

  ngOnInit() {
    this.subtotal = localStorage.getItem("subtotal");
  }

}
