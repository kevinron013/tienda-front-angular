import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtAppToolbarComponent } from './ext-app-toolbar.component';

describe('ExtAppToolbarComponent', () => {
  let component: ExtAppToolbarComponent;
  let fixture: ComponentFixture<ExtAppToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtAppToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtAppToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
