import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SkillService } from 'src/app/services/skill.service';
import { Skill } from 'functions/src/interface/skill';
import { SkillDataModel } from '../model/skill-data.model';

@Component({
  selector: 'app-skill-pill',
  templateUrl: './skill-pill.component.html',
  styleUrls: ['./skill-pill.component.scss'],
})
export class SkillPillComponent implements OnInit {
  @Input() isLargeFont: boolean;
  @Input() skill: SkillDataModel;

  @Output() removePill: EventEmitter<string> = new EventEmitter();

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {}

  doRemovePill() {
    this.removePill.emit(this.skill.skillId);
  }
}
