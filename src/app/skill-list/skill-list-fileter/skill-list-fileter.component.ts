import { Component, OnInit } from '@angular/core';
import { SkillService } from 'src/app/services/skill.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-skill-list-fileter',
  templateUrl: './skill-list-fileter.component.html',
  styleUrls: ['./skill-list-fileter.component.scss'],
})
export class SkillListFileterComponent implements OnInit {
  private index = this.skillService.index.skills;

  tags: {
    value: string;
    highlighted: string;
    count: number;
    selected?: boolean;
  }[] = [];
  tagFilter = new FormControl();
  tagRule = new FormControl('and');
  tagControl = new FormControl();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private skillService: SkillService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((map) => {
      this.tagRule.patchValue(map.get('rule') || 'and', {
        emitEvent: false,
      });

      const tagFilter = map.get('tagFilter') || '';
      this.tagFilter.patchValue(tagFilter, {
        emitEvent: false,
      });

      const defaultTags = map.get('tags') ? map.get('tags').split(',') : [];
      this.buildTags(tagFilter, defaultTags);
    });

    this.tagFilter.valueChanges.subscribe((facetQuery) => {
      this.updateParams({
        tagFilter: facetQuery || null,
      });
    });

    this.tagRule.valueChanges.subscribe((rule) => {
      this.updateParams({
        rule,
      });
    });
  }

  private updateParams(params: object) {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: params,
    });
  }

  private buildTags(facetQuery: string = '', defaultTags?: string[]) {
    this.index
      .searchForFacetValues('skillCategories', facetQuery)
      .then((result) => {
        this.tags = result.facetHits;
        this.tagControl.patchValue(defaultTags, { emitEvent: false });
      });
  }

  updateTags(event: MatSelectionListChange) {
    const values = event.source.selectedOptions.selected.map(
      (selected) => selected.value
    );
    this.updateParams({
      tags: values.length ? values.join(',') : null,
      page: 1,
    });
  }
}
