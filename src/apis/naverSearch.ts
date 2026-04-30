// src/apis/naverSearch.ts
import { request } from './base';
import { NAVER_CLIENT_ID, NAVER_CLIENT_SECRET } from '@env'; // RN‑CLI 경우

const BASE_URL = 'https://openapi.naver.com/v1/search/local.json';

export const fetchNaverLocal = async (query: string) => {
  return await request<any>(BASE_URL, {
    method: 'GET',
    headers: {
      'X-Naver-Client-Id': NAVER_CLIENT_ID,
      'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
    },
    params: { query, display: '5' },
  });
};
