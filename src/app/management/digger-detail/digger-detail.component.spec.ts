import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DiggerDetailComponent} from './digger-detail.component';

describe('DiggerDetailComponent', () => {
  let component: DiggerDetailComponent;
  let fixture: ComponentFixture<DiggerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiggerDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiggerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
