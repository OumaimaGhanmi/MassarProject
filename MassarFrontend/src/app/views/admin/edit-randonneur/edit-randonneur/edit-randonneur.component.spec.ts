import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRandonneurComponent } from './edit-randonneur.component';

describe('EditRandonneurComponent', () => {
  let component: EditRandonneurComponent;
  let fixture: ComponentFixture<EditRandonneurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRandonneurComponent]
    });
    fixture = TestBed.createComponent(EditRandonneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
