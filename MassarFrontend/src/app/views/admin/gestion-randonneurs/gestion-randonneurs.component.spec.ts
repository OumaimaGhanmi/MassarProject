import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRandonneursComponent } from './gestion-randonneurs.component';

describe('GestionRandonneursComponent', () => {
  let component: GestionRandonneursComponent;
  let fixture: ComponentFixture<GestionRandonneursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionRandonneursComponent]
    });
    fixture = TestBed.createComponent(GestionRandonneursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
