import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditadComponent } from './editad.component';

describe('EditadComponent', () => {
  let component: EditadComponent;
  let fixture: ComponentFixture<EditadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
