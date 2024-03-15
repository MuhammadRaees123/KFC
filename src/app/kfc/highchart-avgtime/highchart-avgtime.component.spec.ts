import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartAVGTimeComponent } from './highchart-avgtime.component';

describe('HighchartAVGTimeComponent', () => {
  let component: HighchartAVGTimeComponent;
  let fixture: ComponentFixture<HighchartAVGTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighchartAVGTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighchartAVGTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
