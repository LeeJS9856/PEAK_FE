import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';

interface LocationInputSectionProps {
  startLocation: string;
  setStartLocation: (text: string) => void;
  endLocation: string;
  setEndLocation: (text: string) => void;
}

const LocationInputSection: React.FC<LocationInputSectionProps> = ({
  startLocation,
  setStartLocation,
  endLocation,
  setEndLocation,
}) => {
  const navigation = useNavigation<any>();

  // 기존 로직 그대로 유지
  const goToSearchForStart = () => {
    navigation.navigate('Search', {
      target: 'start',
      onSelect: (placeName: string) => {
        setStartLocation(placeName);
      },
    });
  };

  const goToSearchForEnd = () => {
    navigation.navigate('Search', {
      target: 'end',
      onSelect: (placeName: string) => {
        setEndLocation(placeName);
      },
    });
  };

  return (
    <View style={styles.inputBox}>
      <View style={styles.row}>
        <Icon name="trail-sign" size={25} color={COLORS.success} />
        <TextInput
          style={styles.input}
          placeholder="출발 장소 입력"
          placeholderTextColor={COLORS.placeholder}
          value={startLocation}
          onFocus={goToSearchForStart} // 기존 로직
          onChangeText={setStartLocation} // 기존 로직
        />
      </View>

      <View style={[styles.row, styles.rowSecond]}>
        <Icon name="trail-sign" size={25} color={COLORS.error} />
        <TextInput
          style={styles.input}
          placeholder="도착 장소 입력"
          placeholderTextColor={COLORS.placeholder}
          value={endLocation}
          onFocus={goToSearchForEnd} // 기존 로직
          onChangeText={setEndLocation} // 기존 로직
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.goBack()} // 기존 로직
        style={styles.closeBtn}
      >
        <Icon name="close" size={20} color={COLORS.darkgray} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    flexDirection: 'column',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
    margin: 16,
    alignItems: 'stretch',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    width: '100%',
  },
  rowSecond: {
    marginTop: 18,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
    paddingVertical: 0,
  },
  closeBtn: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
});

export default LocationInputSection;
