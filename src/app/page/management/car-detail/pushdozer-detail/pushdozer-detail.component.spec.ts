import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PushdozerDetailComponent} from './pushdozer-detail.component';

describe('PushdozerDetailComponent', () => {
  let component: PushdozerDetailComponent;
  let fixture: ComponentFixture<PushdozerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PushdozerDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PushdozerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
