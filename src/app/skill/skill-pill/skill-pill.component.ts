import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SkillService } from 'src/app/services/skill.service';
import { Skill } from 'functions/src/interface/skill';

@Component({
  selector: 'app-skill-pill',
  templateUrl: './skill-pill.component.html',
  styleUrls: ['./skill-pill.component.scss'],
})
export class SkillPillComponent implements OnInit {
  @Input() skillColor: string;
  @Input() isLargeFont: boolean;
  @Input() skill: Skill;

  @Output() removePill: EventEmitter<string> = new EventEmitter();

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {}

  doRemovePill() {
    this.removePill.emit(this.skill.skillId);
  }
}
