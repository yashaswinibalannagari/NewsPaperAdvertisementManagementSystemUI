import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveadsComponent } from './approveads.component';

describe('ApproveadsComponent', () => {
  let component: ApproveadsComponent;
  let fixture: ComponentFixture<ApproveadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
