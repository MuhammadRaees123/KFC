import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderRatingHeaderComponent } from './rider-rating-header.component';

describe('RiderRatingHeaderComponent', () => {
  let component: RiderRatingHeaderComponent;
  let fixture: ComponentFixture<RiderRatingHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiderRatingHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RiderRatingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
