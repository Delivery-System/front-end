import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdeliveryMateComponent } from './edelivery-mate.component';

describe('EdeliveryMateComponent', () => {
  let component: EdeliveryMateComponent;
  let fixture: ComponentFixture<EdeliveryMateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdeliveryMateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdeliveryMateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
