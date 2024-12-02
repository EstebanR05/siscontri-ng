import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantManagerComponent } from './accountant-manager.component';

describe('AccountantManagerComponent', () => {
  let component: AccountantManagerComponent;
  let fixture: ComponentFixture<AccountantManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountantManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountantManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
