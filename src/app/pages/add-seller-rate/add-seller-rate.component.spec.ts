import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSellerRateComponent } from './add-seller-rate.component';

describe('AddSellerRateComponent', () => {
  let component: AddSellerRateComponent;
  let fixture: ComponentFixture<AddSellerRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSellerRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSellerRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
