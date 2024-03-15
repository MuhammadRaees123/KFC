import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartDelivertimeComponent } from './highchart-delivertime.component';

describe('HighchartDelivertimeComponent', () => {
  let component: HighchartDelivertimeComponent;
  let fixture: ComponentFixture<HighchartDelivertimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighchartDelivertimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighchartDelivertimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
