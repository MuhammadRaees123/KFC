import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartOrderdetailsComponent } from './highchart-orderdetails.component';

describe('HighchartOrderdetailsComponent', () => {
  let component: HighchartOrderdetailsComponent;
  let fixture: ComponentFixture<HighchartOrderdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighchartOrderdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighchartOrderdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
