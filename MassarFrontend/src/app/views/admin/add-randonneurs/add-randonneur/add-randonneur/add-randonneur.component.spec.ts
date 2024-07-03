import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRandonneurComponent } from './add-randonneur.component';

describe('AddRandonneurComponent', () => {
  let component: AddRandonneurComponent;
  let fixture: ComponentFixture<AddRandonneurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRandonneurComponent]
    });
    fixture = TestBed.createComponent(AddRandonneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
