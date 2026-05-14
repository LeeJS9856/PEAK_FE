// src/constants/gasStations.ts
export interface GasStation {
  id: string;
  name: string;
  brand: string;           // ← 브랜드 문자열만 보관 (이미지는 매핑 테이블에서 찾음)
  fuelType: string;
  pricePerLiter: number;
  distance: string;
  totalPrice: number;
  tag?: '최저가' | '최단거리';
}

export const DUMMY_STATIONS: GasStation[] = [
  {
    id: '1',
    name: '피크 주유소',
    brand: 'SK에너지',
    fuelType: '휘발유',
    pricePerLiter: 1765,
    distance: '1.8km',
    totalPrice: 55375,
    tag: '최저가',
  },
  {
    id: '2',
    name: '광주 주유소',
    brand: 'GS칼텍스',
    fuelType: '휘발유',
    pricePerLiter: 1770,
    distance: '3.2km',
    totalPrice: 55375,
    tag: '최단거리',
  },
  {
    id: '3',
    name: '행복 주유소',
    brand: 'S오일',
    fuelType: '휘발유',
    pricePerLiter: 1780,
    distance: '4.5km',
    totalPrice: 56000,
  },
  {
    id: '4',
    name: '알뜰 주유소',
    brand: '알뜰주유소',
    fuelType: '휘발유',
    pricePerLiter: 1710,
    distance: '5.0km',
    totalPrice: 54000,
  },
];
