// src/components/FloatingActionButton.tsx
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
  Platform,
} from 'react-native';
import { COLORS } from '../constants/colors';

interface FloatingActionButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  children?: React.ReactNode;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  children,
  position = 'bottom-right',
  backgroundColor = COLORS.primary,
  size = 'medium',
}) => {
  const getPositionStyle = (): ViewStyle => {
    const positions = {
      'bottom-right': { bottom: 20, right: 20 },
      'bottom-left': { bottom: 20, left: 20 },
      'top-right': { top: 20, right: 20 },
      'top-left': { top: 20, left: 20 },
    };
    return positions[position];
  };

  const getSizeStyle = () => {
    const sizes = {
      small: { width: 50, height: 50, borderRadius: 25 },
      medium: { width: 60, height: 60, borderRadius: 30 },
      large: { width: 70, height: 70, borderRadius: 35 },
    };
    return sizes[size];
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.button,
        getSizeStyle(),
        getPositionStyle(),
        { backgroundColor },
        Platform.OS === 'ios' && styles.shadowIOS,
        Platform.OS === 'android' && styles.shadowAndroid,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  shadowIOS: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  shadowAndroid: {
    elevation: 5,
  },
});

export default FloatingActionButton;
