import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtAppLayoutComponent } from './ext-app-layout.component';

describe('ExtAppLayoutComponent', () => {
  let component: ExtAppLayoutComponent;
  let fixture: ComponentFixture<ExtAppLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtAppLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtAppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
