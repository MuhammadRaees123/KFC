import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartDrivemeterComponent } from './highchart-drivemeter.component';

describe('HighchartDrivemeterComponent', () => {
  let component: HighchartDrivemeterComponent;
  let fixture: ComponentFixture<HighchartDrivemeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighchartDrivemeterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighchartDrivemeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
