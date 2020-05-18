import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-skill-detail',
  templateUrl: './skill-detail.component.html',
  styleUrls: ['./skill-detail.component.scss'],
})
export class SkillDetailComponent implements OnInit {
  skillId: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.skillId = this.route.snapshot.paramMap.get('id');
  }
}
