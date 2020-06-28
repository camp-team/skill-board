export interface ScrapingData {
  skills: string[]; // スクレイピングした生データ
  skillIdSet?: Set<string>; // 名寄せ・重複削除をした登録用のスキルID
  contract: string;
  price: number;
  prefectures: string;
  station: string;
}
