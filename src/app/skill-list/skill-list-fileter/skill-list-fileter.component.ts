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
  }[];
  // tagFilter = new FormControl();
  // tagRule = new FormControl('and');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private skillService: SkillService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit');

    this.route.queryParamMap.subscribe((map) => {
      // this.tagRule.patchValue(map.get('rule') || 'and', {
      //   emitEvent: false,
      // });

      // const tagFilter = map.get('tagFilter') || '';
      // this.tagFilter.patchValue(tagFilter, {
      //   emitEvent: false,
      // });

      console.log('skill-list-fileter.subscribe');

      const defaultTags = map.get('tags') ? map.get('tags').split(',') : [];
      this.buildTags('', defaultTags);
      // console.log('defaultTags:' + defaultTags);

      // this.tags.forEach((tag) => {
      //   tag.selected = defaultTags.includes(tag.value);
      // });
    });

    // this.tagFilter.valueChanges.subscribe((facetQuery) => {
    //   this.updateParams({
    //     tagFilter: facetQuery || null,
    //   });
    // });
    // this.tagRule.valueChanges.subscribe((rule) => {
    //   this.updateParams({
    //     rule,
    //   });
    // });
  }
  private updateParams(params: object) {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: params,
    });
  }

  private buildTags(facetQuery: string = '', defaultTags?: string[]) {
    console.log('buildTags' + defaultTags);
    this.index.searchForFacetValues('skillCategories', '').then((result) => {
      console.log('before:' + JSON.stringify(this.tags));
      this.tags = result.facetHits.map((tag) => ({
        ...tag,
        selected: defaultTags && defaultTags.includes(tag.value),
      }));
      console.log('after:' + JSON.stringify(this.tags));
    });
    this.tags[0].value = this.tags[0].value + '_';
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
