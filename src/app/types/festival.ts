export interface Festival {
  id: string;
  name: string;
  englishDate: string;
  nepaliDate: string;
  description: string;
  significance: string;
  category: 'religious' | 'cultural' | 'national' | 'seasonal';
  importance: 'high' | 'medium' | 'low';
  tags: string[];
  region?: string;
  duration?: string;
  traditions?: string[];
}

export interface MonthlyEvents {
  [month: string]: Festival[];
}