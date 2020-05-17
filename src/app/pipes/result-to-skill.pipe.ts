import { Pipe, PipeTransform } from '@angular/core';
import { AggregationResult } from '../interfaces/aggregation-result';
import { Skill } from '../interfaces/skill';
import { SkillService } from '../services/skill.service';

@Pipe({
  name: 'resultToSkill',
})
export class ResultToSkillPipe implements PipeTransform {
  constructor(private skillService: SkillService) {}

  transform(result: AggregationResult): Skill {
    return this.skillService.getSkill(result.skillId);
  }
}
