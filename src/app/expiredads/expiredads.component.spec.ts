import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredadsComponent } from './expiredads.component';

describe('ExpiredadsComponent', () => {
  let component: ExpiredadsComponent;
  let fixture: ComponentFixture<ExpiredadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiredadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
