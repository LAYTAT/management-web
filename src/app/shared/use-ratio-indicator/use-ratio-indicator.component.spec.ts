import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UseRatioIndicatorComponent} from './use-ratio-indicator.component';

describe('UseRatioIndicatorComponent', () => {
  let component: UseRatioIndicatorComponent;
  let fixture: ComponentFixture<UseRatioIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UseRatioIndicatorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseRatioIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
