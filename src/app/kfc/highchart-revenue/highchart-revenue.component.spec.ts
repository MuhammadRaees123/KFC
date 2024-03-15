import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartRevenueComponent } from './highchart-revenue.component';

describe('HighchartRevenueComponent', () => {
  let component: HighchartRevenueComponent;
  let fixture: ComponentFixture<HighchartRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighchartRevenueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighchartRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
