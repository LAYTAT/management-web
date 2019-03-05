import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DiggerListComponent} from './digger-list.component';

describe('DiggerListComponent', () => {
  let component: DiggerListComponent;
  let fixture: ComponentFixture<DiggerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiggerListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiggerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
