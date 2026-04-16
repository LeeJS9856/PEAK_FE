// src/utils/searchUtils.ts
export interface SearchResult {
  id: string;
  name: string;
  address: string;
  category: string;
}

export const MOCK_DATA: SearchResult[] = [
  { id: '1', name: '전남대학교', address: '광주광역시 북구 용봉로 77', category: '대학교' },
  { id: '2', name: '전남대학교병원', address: '광주광역시 동구 제봉로 42', category: '대학병원' },
  { id: '3', name: '전남대학교 광주캠퍼스', address: '광주광역시 북구 용봉동', category: '대학교' },
  { id: '4', name: '전남대학교 정문', address: '광주광역시 북구 신안동', category: '교문,출입구' },
];

// 검색어에 따라 데이터를 필터링하는 함수
export const getFilteredData = (query: string): SearchResult[] => {
  if (!query.trim()) return [];
  
  return MOCK_DATA.filter((item) => {
    const itemData = item.name.toLowerCase();
    const textData = query.toLowerCase();
    return itemData.includes(textData);
  });
};
