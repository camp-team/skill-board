import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillDetailBreakdownComponent } from './skill-detail-breakdown.component';

describe('SkillDetailBreakdownComponent', () => {
  let component: SkillDetailBreakdownComponent;
  let fixture: ComponentFixture<SkillDetailBreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SkillDetailBreakdownComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillDetailBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
