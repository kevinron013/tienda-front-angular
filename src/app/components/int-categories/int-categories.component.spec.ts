import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntCategoriesComponent } from './int-categories.component';

describe('IntCategoriesComponent', () => {
  let component: IntCategoriesComponent;
  let fixture: ComponentFixture<IntCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
