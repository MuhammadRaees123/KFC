import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartSourceComponent } from './highchart-source.component';

describe('HighchartSourceComponent', () => {
  let component: HighchartSourceComponent;
  let fixture: ComponentFixture<HighchartSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighchartSourceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighchartSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
