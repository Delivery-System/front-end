import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdeliveryComponent } from './edelivery.component';

describe('EdeliveryComponent', () => {
  let component: EdeliveryComponent;
  let fixture: ComponentFixture<EdeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
