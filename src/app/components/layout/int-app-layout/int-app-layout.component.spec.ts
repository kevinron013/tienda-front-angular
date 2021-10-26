import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntAppLayoutComponent } from './int-app-layout.component';

describe('IntAppLayoutComponent', () => {
  let component: IntAppLayoutComponent;
  let fixture: ComponentFixture<IntAppLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntAppLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntAppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
