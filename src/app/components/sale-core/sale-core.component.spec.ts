import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleCoreComponent } from './sale-core.component';

describe('SaleCoreComponent', () => {
  let component: SaleCoreComponent;
  let fixture: ComponentFixture<SaleCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
