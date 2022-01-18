import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewadComponent } from './viewad.component';

describe('ViewadComponent', () => {
  let component: ViewadComponent;
  let fixture: ComponentFixture<ViewadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
