import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillPillComponent } from './skill-pill.component';

describe('SkillPillComponent', () => {
  let component: SkillPillComponent;
  let fixture: ComponentFixture<SkillPillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SkillPillComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
