export interface ScrapingData {
  skills: string[]; // スクレイピングした生データ
  skillSet?: Set<string>; // 名寄せ・重複削除をした登録用データ
  contract: string;
  price: number;
  prefectures: string;
  station: string;
}
