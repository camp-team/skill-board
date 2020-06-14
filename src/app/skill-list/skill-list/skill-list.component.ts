import { Component, OnInit } from '@angular/core';
import { SkillService } from 'src/app/services/skill.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/interfaces/skill';
import { SearchIndex } from 'algoliasearch/lite';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss'],
})
export class SkillListComponent implements OnInit {
  skills: Skill[] = [];

  private index: SearchIndex = this.skillService.index.skills;

  // TODO:要実装
  loading: boolean;
  scrollMode = false;
  result: {
    nbHits: number;
    hits: any[];
  }; // TODO: 型対応後調整(https://github.com/algolia/algoliasearch-client-javascript/pull/1086)
  resultList: Skill[] = [];
  query: string;
  requestOptions: any = {}; // TODO: 型対応後調整(https://github.com/algolia/algoliasearch-client-javascript/pull/1086)
  private tagFilter: {
    rule: string;
    tags: string[];
  };

  constructor(
    private skillService: SkillService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((map) => {
      this.resultList = [];
      // TODO:要実装
      // this.index = this.searchService.index[map.get('sort') || 'popular'];
      this.query = map.get('searchQuery') || '';
      // this.requestOptions = {
      //   page: +map.get('page') > 0 ? +map.get('page') - 1 : 0,
      //   hitsPerPage: map.get('perPage') ? +map.get('perPage') : 20,
      // };
      // this.tagFilter = {
      //   rule: map.get('rule')?.match(/and|or/) ? map.get('rule') : 'and',
      //   tags: map.get('tags') ? map.get('tags').split(',') : [],
      // };
      this.algoliaSearch();
    });
  }

  algoliaSearch() {
    // TODO:要実装
    // const rule = this.tagFilter.tags.map((tag) => 'categories:' + tag);

    console.log('algoliaSearch');

    this.loading = true;
    this.index
      .search<Skill>(this.query, {
        // TODO:要実装
        //        facetFilters: this.tagFilter.rule === 'and' ? rule : [rule],
        //        ...this.requestOptions,
      })
      .then((result) => {
        console.log(result);
        this.result = result;
        const items = result.hits as any[]; // TODO: 型対応後調整(https://github.com/algolia/algoliasearch-client-javascript/pull/1086)
        this.resultList.push(...items);
        this.loading = false;

        this.skills = result.hits as any[];
      });
  }
}
