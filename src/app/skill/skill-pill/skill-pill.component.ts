import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SkillService } from 'src/app/services/skill.service';
import { Skill } from 'functions/src/interface/skill';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-skill-pill',
  templateUrl: './skill-pill.component.html',
  styleUrls: ['./skill-pill.component.scss'],
})
export class SkillPillComponent implements OnInit {
  @Input() skillId: string;
  @Input() skillColor: string;

  skill$: Observable<Skill>;

  @Output() removePill: EventEmitter<string> = new EventEmitter();
  @Output() changePill: EventEmitter<string> = new EventEmitter();

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {
    this.skill$ = this.skillService.getSkill(this.skillId);
  }

  doRemovePill() {
    this.removePill.emit(this.skillId);
  }

  doChangePill() {
    this.changePill.emit(this.skillId);
  }
}
