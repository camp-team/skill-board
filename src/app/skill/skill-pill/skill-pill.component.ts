import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
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

  @ViewChild('skillPill') pillElm: ElementRef;

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

  @HostListener('window:resize')
  doResize() {
    // skill-pillが、非mobileかつ幅広の場合に、文字を大きくするためのclassを付加する
    if (this.pillElm) {
      if (
        this.pillElm.nativeElement.offsetHeight >= 128 &&
        this.pillElm.nativeElement.offsetWidth > 446
      ) {
        this.pillElm.nativeElement.classList.add('skill-pill-large-font');
      } else {
        this.pillElm.nativeElement.classList.remove('skill-pill-large-font');
      }
    }
  }
}
