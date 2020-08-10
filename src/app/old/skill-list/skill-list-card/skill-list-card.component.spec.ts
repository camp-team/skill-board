import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillListCardComponent } from './skill-list-card.component';

describe('SkillListCardComponent', () => {
  let component: SkillListCardComponent;
  let fixture: ComponentFixture<SkillListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SkillListCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
