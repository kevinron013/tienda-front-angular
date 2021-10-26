import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntNewuserComponent } from './int-newuser.component';

describe('IntNewuserComponent', () => {
  let component: IntNewuserComponent;
  let fixture: ComponentFixture<IntNewuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntNewuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntNewuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
