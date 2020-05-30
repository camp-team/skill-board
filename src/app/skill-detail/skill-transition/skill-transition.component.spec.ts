import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillTransitionComponent } from './skill-transition.component';

describe('SkillTransitionComponent', () => {
  let component: SkillTransitionComponent;
  let fixture: ComponentFixture<SkillTransitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SkillTransitionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
