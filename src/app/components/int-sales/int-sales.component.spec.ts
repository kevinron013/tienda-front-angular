import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntSalesComponent } from './int-sales.component';

describe('IntSalesComponent', () => {
  let component: IntSalesComponent;
  let fixture: ComponentFixture<IntSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
