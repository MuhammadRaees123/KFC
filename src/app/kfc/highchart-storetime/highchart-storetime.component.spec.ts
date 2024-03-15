import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartStoretimeComponent } from './highchart-storetime.component';

describe('HighchartStoretimeComponent', () => {
  let component: HighchartStoretimeComponent;
  let fixture: ComponentFixture<HighchartStoretimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighchartStoretimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighchartStoretimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
