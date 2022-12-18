import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Second1Component } from './second1.component';

describe('Second1Component', () => {
  let component: Second1Component;
  let fixture: ComponentFixture<Second1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Second1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Second1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
