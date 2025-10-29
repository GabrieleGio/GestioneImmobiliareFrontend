import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrattativeAnnuncioComponent } from './trattative-annuncio.component';

describe('TrattativeAnnuncioComponent', () => {
  let component: TrattativeAnnuncioComponent;
  let fixture: ComponentFixture<TrattativeAnnuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrattativeAnnuncioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrattativeAnnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
