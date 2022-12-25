import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdvertComponent } from './edit-advert.component';

describe('EditAdvertComponent', () => {
  let component: EditAdvertComponent;
  let fixture: ComponentFixture<EditAdvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdvertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
