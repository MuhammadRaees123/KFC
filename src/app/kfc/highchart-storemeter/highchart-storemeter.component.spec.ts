import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartStoremeterComponent } from './highchart-storemeter.component';

describe('HighchartStoremeterComponent', () => {
  let component: HighchartStoremeterComponent;
  let fixture: ComponentFixture<HighchartStoremeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighchartStoremeterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighchartStoremeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
