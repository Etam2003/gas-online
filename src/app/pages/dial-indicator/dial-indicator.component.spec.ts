import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialIndicatorComponent } from './dial-indicator.component';

describe('DialIndicatorComponent', () => {
  let component: DialIndicatorComponent;
  let fixture: ComponentFixture<DialIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialIndicatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
