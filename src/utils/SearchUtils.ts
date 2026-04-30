// src/utils/SearchUtils.ts
import { fetchNaverLocal } from '../apis/naverSearch';

export interface SearchResult {
  id: string;
  name: string;
  address: string;
  category: string;
}

export const getFilteredData = async (query: string): Promise<SearchResult[]> => {
  if (!query.trim()) return [];

  const apiRes = await fetchNaverLocal(query);
  if (!apiRes?.items) return [];

  return apiRes.items.map((place: any) => ({
    id: place.link?.split('/').pop() || `${place.mapx}${place.mapy}`,
    name: place.title.replace(/<[^>]*>/g, ''),
    address: place.roadAddress || place.address || '',
    category: place.category || '기타',
  }));
};
