import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitionChartComponent } from './transition-chart.component';

describe('TransitionChartComponent', () => {
  let component: TransitionChartComponent;
  let fixture: ComponentFixture<TransitionChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransitionChartComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
