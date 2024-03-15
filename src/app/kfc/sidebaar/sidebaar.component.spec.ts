import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebaarComponent } from './sidebaar.component';

describe('SidebaarComponent', () => {
  let component: SidebaarComponent;
  let fixture: ComponentFixture<SidebaarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebaarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebaarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
