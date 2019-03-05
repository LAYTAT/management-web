import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PushdozerListComponent} from './pushdozer-list.component';

describe('PushdozerListComponent', () => {
  let component: PushdozerListComponent;
  let fixture: ComponentFixture<PushdozerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PushdozerListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PushdozerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
