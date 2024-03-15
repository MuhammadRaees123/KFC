import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderSettingHeaderComponent } from './rider-setting-header.component';

describe('RiderSettingHeaderComponent', () => {
  let component: RiderSettingHeaderComponent;
  let fixture: ComponentFixture<RiderSettingHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiderSettingHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RiderSettingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
