import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelephoneFieldComponent } from './telephone-field.component';

describe('TelephoneFieldComponent', () => {
  let component: TelephoneFieldComponent;
  let fixture: ComponentFixture<TelephoneFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelephoneFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelephoneFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
