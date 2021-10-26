import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntNewbookComponent } from './int-newbook.component';

describe('IntNewbookComponent', () => {
  let component: IntNewbookComponent;
  let fixture: ComponentFixture<IntNewbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntNewbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntNewbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
