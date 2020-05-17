import { ResultToSkillPipe } from './result-to-skill.pipe';
import { SkillService } from '../services/skill.service';

describe('ResultToSkillPipe', () => {
  it('create an instance', () => {
    const pipe = new ResultToSkillPipe(new SkillService());
    expect(pipe).toBeTruthy();
  });
});
