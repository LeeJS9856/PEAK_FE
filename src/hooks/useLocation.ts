import { useEffect, useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

interface LocationCoords {
  latitude: number;
  longitude: number;
}

export const useLocation = () => {
  const [initialLocation, setInitialLocation] = useState<LocationCoords | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Geolocation 설정
  useEffect(() => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'whenInUse',
      locationProvider: 'auto',
    });
  }, []);

  // 권한 요청 및 위치 정보 가져오기
  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: '위치 정보 권한',
              message: '지도를 표시하기 위해 현재 위치가 필요합니다.',
              buttonNeutral: '나중에',
              buttonNegative: '거부',
              buttonPositive: '승인',
            }
          );

          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('위치 권한이 거부되었습니다.');
            setInitialLocation({ latitude: 37.5665, longitude: 126.9780 });
            setLoading(false);
            return;
          }
        }

        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log('✅ 현재 위치 획득:', { latitude, longitude });
            setInitialLocation({ latitude, longitude });
            setLoading(false);
          },
          (error) => {
            console.log('❌ 위치 정보 오류:', error);
            setError(error.message);
            setInitialLocation({ latitude: 37.5665, longitude: 126.9780 });
            setLoading(false);
          },
          {
            timeout: 20000,
            maximumAge: 1000,
            enableHighAccuracy: true,
          }
        );
      } catch (err) {
        console.error('❌ 권한 요청 오류:', err);
        setError(String(err));
        setInitialLocation({ latitude: 37.5665, longitude: 126.9780 });
        setLoading(false);
      }
    };

    requestLocationPermission();
  }, []);

  return { initialLocation, loading, error };
};
