import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtMainSliderComponent } from './ext-main-slider.component';

describe('ExtMainSliderComponent', () => {
  let component: ExtMainSliderComponent;
  let fixture: ComponentFixture<ExtMainSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtMainSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtMainSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
