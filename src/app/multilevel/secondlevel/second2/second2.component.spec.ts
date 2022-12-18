import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Second2Component } from './second2.component';

describe('Second2Component', () => {
  let component: Second2Component;
  let fixture: ComponentFixture<Second2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Second2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Second2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
