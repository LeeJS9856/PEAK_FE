// src/hooks/useBottomSheet.ts
import { useRef } from 'react';
import { Animated, PanResponder, Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface UseBottomSheetProps {
  minHeight: number;
  maxHeight: number;
}

export const useBottomSheet = ({ minHeight, maxHeight }: UseBottomSheetProps) => {
  // 초기 위치는 화면 하단에서 minHeight만큼 올라온 상태
  const panY = useRef(new Animated.Value(SCREEN_HEIGHT - minHeight)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (_, gestureState) => {
        const newY = SCREEN_HEIGHT - minHeight + gestureState.dy;
        // 최소/최대 높이 범위 안에서만 움직이도록 제한
        if (newY >= SCREEN_HEIGHT - maxHeight && newY <= SCREEN_HEIGHT - minHeight) {
          panY.setValue(newY);
        }
      },

      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -50) {
          // 위로 빠르게 올렸을 때
          snapTo(SCREEN_HEIGHT - maxHeight);
        } else if (gestureState.dy > 50) {
          // 아래로 빠르게 내렸을 때
          snapTo(SCREEN_HEIGHT - minHeight);
        } else {
          // 애매한 위치일 때 가까운 곳으로 스냅
          const currentY = SCREEN_HEIGHT - minHeight + gestureState.dy;
          const distToMax = Math.abs(currentY - (SCREEN_HEIGHT - maxHeight));
          const distToMin = Math.abs(currentY - (SCREEN_HEIGHT - minHeight));

          snapTo(distToMax < distToMin ? SCREEN_HEIGHT - maxHeight : SCREEN_HEIGHT - minHeight);
        }
      },
    })
  ).current;

  // 원하는 위치로 부드럽게 이동시키는 함수
  const snapTo = (toValue: number) => {
    Animated.spring(panY, {
      toValue,
      useNativeDriver: false, // top/left 애니메이션은 native driver 미지원
      tension: 50,
      friction: 10,
    }).start();
  };

  return {
    panY,
    panHandlers: panResponder.panHandlers,
    snapTo, // 필요 시 외부에서 버튼 등으로 조절 가능
  };
};
