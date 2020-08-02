import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillDetailDistributionComponent } from './skill-detail-distribution.component';

describe('SkillDetailDistributionComponent', () => {
  let component: SkillDetailDistributionComponent;
  let fixture: ComponentFixture<SkillDetailDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SkillDetailDistributionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillDetailDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
