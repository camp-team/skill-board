export interface ScrapingData {
  skills: string[]; // スクレイピングした生データ
  skillIds?: string[]; // 名寄せ・重複削除をした登録用のスキルID
  contract: string;
  remoteable: boolean;
  price: number;
  prefectures: string;
  station: string;
  url: string;
  scrapingTarget?: string;
  scrapingDate?: number; //YYYYMMDD形式の8桁数値
}
