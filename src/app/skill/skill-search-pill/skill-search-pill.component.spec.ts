import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillSearchPillComponent } from './skill-search-pill.component';

describe('SkillSearchPillComponent', () => {
  let component: SkillSearchPillComponent;
  let fixture: ComponentFixture<SkillSearchPillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SkillSearchPillComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillSearchPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
