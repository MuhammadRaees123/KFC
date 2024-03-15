import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingHeaderComponent } from './accounting-header.component';

describe('AccountingHeaderComponent', () => {
  let component: AccountingHeaderComponent;
  let fixture: ComponentFixture<AccountingHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountingHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
