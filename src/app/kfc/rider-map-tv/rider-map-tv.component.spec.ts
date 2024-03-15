import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderMapTVComponent } from './rider-map-tv.component';

describe('RiderMapTVComponent', () => {
  let component: RiderMapTVComponent;
  let fixture: ComponentFixture<RiderMapTVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiderMapTVComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RiderMapTVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
