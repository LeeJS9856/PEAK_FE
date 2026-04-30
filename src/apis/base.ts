// src/apis/base.ts

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

/**
 * 전역에서 공통으로 사용할 fetch 래퍼 함수
 */
export const request = async <T>(url: string, options: RequestOptions = {}): Promise<T | null> => {
  try {
    const { method = 'GET', headers = {}, params } = options;

    // 1. 쿼리 파라미터가 있다면 URL 뒤에 붙여줌
    let fullUrl = url;
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      fullUrl += `?${queryString}`;
    }

    const response = await fetch(fullUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers, // 커스텀 헤더 (Naver ID, Secret 등) 추가인자
      },
    });

    if (!response.ok) {
      throw new Error(`API Request Failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
};
