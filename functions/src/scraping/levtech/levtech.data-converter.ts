import { ScrapingData } from '../scraping-data';

export class LevtechDataConverter {
  // スキル名の特殊置換対象
  private skillConvertMap = new Map<string, string>([
    ['AndroidSDK', 'android'],
    ['AngularJS', 'angular'],
    ['C言語', 'c'],
    ['C#.NET', 'c#'],
    ['Google Cloud Platform', 'gcp'],
    ['Microsoft Azure', 'azure'],
    ['PL/SQL', 'plsql'],
    ['VB.NET', 'vb'],
  ]);

  public exec(scrapingDataList: ScrapingData[]): ScrapingData[] {
    console.log('LevtechDataConverter.exec.start');
    scrapingDataList.forEach((scrapingData) => {
      scrapingData.skillIds = this.convertSkillIds(scrapingData.skills);
    });
    console.log('LevtechDataConverter.exec.end');
    return scrapingDataList;
  }

  // スキル名を、内部管理用のid形式に変換
  public convertSkillIds(skills: string[]): string[] {
    const skillIdSet = new Set<string>();
    skills.forEach((skill) => {
      if (this.skillConvertMap.has(skill)) {
        // 特殊変換対象
        skillIdSet.add(this.skillConvertMap.get(skill) + '');
      } else {
        // 特殊変換対象以外は、機械的に置換(小文字にして、空白&カンマを取り除く)
        skillIdSet.add(skill.toLowerCase().replace(/\.|\s|　/g, ''));
      }
    });
    return Array.from(skillIdSet.values());
  }
}
