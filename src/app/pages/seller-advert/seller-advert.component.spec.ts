import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAdvertComponent } from './seller-advert.component';

describe('SellerAdvertComponent', () => {
  let component: SellerAdvertComponent;
  let fixture: ComponentFixture<SellerAdvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerAdvertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerAdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
