import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartDispatchComponent } from './highchart-dispatch.component';

describe('HighchartDispatchComponent', () => {
  let component: HighchartDispatchComponent;
  let fixture: ComponentFixture<HighchartDispatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighchartDispatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighchartDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
