export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}
export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface DiaryEntry {
  weather: Weather;
  date: string;
  visibility: Visibility;
  id: string;
  comment?: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;