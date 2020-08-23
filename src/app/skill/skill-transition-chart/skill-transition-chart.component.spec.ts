import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillTransitionChartComponent } from './skill-transition-chart.component';

describe('SkillTransitionChartComponent', () => {
  let component: SkillTransitionChartComponent;
  let fixture: ComponentFixture<SkillTransitionChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SkillTransitionChartComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillTransitionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
