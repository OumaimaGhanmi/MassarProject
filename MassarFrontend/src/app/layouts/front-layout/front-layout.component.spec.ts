import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontLayoutComponent } from './front-layout.component';

describe('FrontLayoutComponent', () => {
  let component: FrontLayoutComponent;
  let fixture: ComponentFixture<FrontLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrontLayoutComponent]
    });
    fixture = TestBed.createComponent(FrontLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
