import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEventPageComponent } from './customer-event-page.component';

describe('CustomerEventPageComponent', () => {
  let component: CustomerEventPageComponent;
  let fixture: ComponentFixture<CustomerEventPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerEventPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerEventPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
