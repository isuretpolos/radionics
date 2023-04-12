import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotbitsComponent } from './hotbits.component';

describe('HotbitsComponent', () => {
  let component: HotbitsComponent;
  let fixture: ComponentFixture<HotbitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotbitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotbitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
