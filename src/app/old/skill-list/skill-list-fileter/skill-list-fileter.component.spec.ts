import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillListFileterComponent } from './skill-list-fileter.component';

describe('SkillListFileterComponent', () => {
  let component: SkillListFileterComponent;
  let fixture: ComponentFixture<SkillListFileterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SkillListFileterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillListFileterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
