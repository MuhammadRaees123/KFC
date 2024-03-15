import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartDrivetimeComponent } from './highchart-drivetime.component';

describe('HighchartDrivetimeComponent', () => {
  let component: HighchartDrivetimeComponent;
  let fixture: ComponentFixture<HighchartDrivetimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighchartDrivetimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighchartDrivetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
