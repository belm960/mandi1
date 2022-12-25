import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdvertComponent } from './my-advert.component';

describe('MyAdvertComponent', () => {
  let component: MyAdvertComponent;
  let fixture: ComponentFixture<MyAdvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAdvertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
