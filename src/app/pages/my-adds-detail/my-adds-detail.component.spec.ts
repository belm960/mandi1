import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAddsDetailComponent } from './my-adds-detail.component';

describe('MyAddsDetailComponent', () => {
  let component: MyAddsDetailComponent;
  let fixture: ComponentFixture<MyAddsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAddsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAddsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
