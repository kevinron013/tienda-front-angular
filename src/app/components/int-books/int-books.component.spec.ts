import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntBooksComponent } from './int-books.component';

describe('IntBooksComponent', () => {
  let component: IntBooksComponent;
  let fixture: ComponentFixture<IntBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
