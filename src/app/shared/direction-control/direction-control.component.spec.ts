import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DirectionControlComponent} from './direction-control.component';

describe('DirectionControlComponent', () => {
  let component: DirectionControlComponent;
  let fixture: ComponentFixture<DirectionControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DirectionControlComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
