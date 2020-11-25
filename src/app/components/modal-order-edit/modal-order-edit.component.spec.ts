import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrderEditComponent } from './modal-order-edit.component';

describe('ModalOrderEditComponent', () => {
  let component: ModalOrderEditComponent;
  let fixture: ComponentFixture<ModalOrderEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOrderEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOrderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
