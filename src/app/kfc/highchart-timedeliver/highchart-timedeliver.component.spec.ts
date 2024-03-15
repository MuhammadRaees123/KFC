import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartTimedeliverComponent } from './highchart-timedeliver.component';

describe('HighchartTimedeliverComponent', () => {
  let component: HighchartTimedeliverComponent;
  let fixture: ComponentFixture<HighchartTimedeliverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighchartTimedeliverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighchartTimedeliverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
