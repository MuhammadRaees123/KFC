import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartSpeedservicesComponent } from './highchart-speedservices.component';

describe('HighchartSpeedservicesComponent', () => {
  let component: HighchartSpeedservicesComponent;
  let fixture: ComponentFixture<HighchartSpeedservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighchartSpeedservicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighchartSpeedservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
