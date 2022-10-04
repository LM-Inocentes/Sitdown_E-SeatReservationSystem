import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventCreateComponent } from './admin-event-create.component';

describe('AdminEventCreateComponent', () => {
  let component: AdminEventCreateComponent;
  let fixture: ComponentFixture<AdminEventCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEventCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEventCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
