import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderSettingComponent } from './rider-setting.component';

describe('RiderSettingComponent', () => {
  let component: RiderSettingComponent;
  let fixture: ComponentFixture<RiderSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiderSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RiderSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
