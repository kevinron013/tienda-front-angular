import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntUsersComponent } from './int-users.component';

describe('IntUsersComponent', () => {
  let component: IntUsersComponent;
  let fixture: ComponentFixture<IntUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
