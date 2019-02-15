import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UnauthorizationComponent} from './unauthorization.component';

describe('UnauthorizationComponent', () => {
  let component: UnauthorizationComponent;
  let fixture: ComponentFixture<UnauthorizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnauthorizationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
