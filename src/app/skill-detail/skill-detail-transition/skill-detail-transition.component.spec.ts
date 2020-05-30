import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillDetailTransitionComponent } from './skill-detail-transition.component';

describe('SkillDetailTransitionComponent', () => {
  let component: SkillDetailTransitionComponent;
  let fixture: ComponentFixture<SkillDetailTransitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SkillDetailTransitionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillDetailTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
