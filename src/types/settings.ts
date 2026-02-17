export type ThemeMode = 'light' | 'dark';
export type TableDensity = 'compact' | 'normal';

export interface AppSettings {
  userName: string;
  userEmail: string;
  theme: ThemeMode;
  tableDensity: TableDensity;
  itemsPerPage: number;
}
