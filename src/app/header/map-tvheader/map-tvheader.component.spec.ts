import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapTVHeaderComponent } from './map-tvheader.component';

describe('MapTVHeaderComponent', () => {
  let component: MapTVHeaderComponent;
  let fixture: ComponentFixture<MapTVHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapTVHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapTVHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
