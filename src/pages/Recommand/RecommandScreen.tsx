// src/pages/Recommand/RecommandScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Recommand: {
    selectedPlace?: string;
    type?: 'start' | 'end';
  };
};

const RecommandScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, 'Recommand'>>();

  const [startLocation, setStartLocation] = useState<string>('');
  const [endLocation, setEndLocation] = useState<string>('');

  useEffect(() => {
    const { selectedPlace, type } = route.params ?? {};
    if (selectedPlace) {
      if (type === 'start') setStartLocation(selectedPlace);
      else if (type === 'end') setEndLocation(selectedPlace);
    }
  }, [route.params]);

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
    <SafeAreaView style={styles.container}>
      <View style={styles.inputBox}>
        <View style={styles.row}>
          <Icon name="trail-sign" size={25} color={COLORS.success} />
          <TextInput
            style={styles.input}
            placeholder="출발 장소 입력"
            placeholderTextColor={COLORS.placeholder}
            value={startLocation}
            onFocus={goToSearchForStart}
            onChangeText={setStartLocation}
          />
        </View>

        <View style={[styles.row, styles.rowSecond]}>
          <Icon name="trail-sign" size={25} color={COLORS.error} />
          <TextInput
            style={styles.input}
            placeholder="도착 장소 입력"
            placeholderTextColor={COLORS.placeholder}
            value={endLocation}
            onFocus={goToSearchForEnd}
            onChangeText={setEndLocation}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeBtn}
        >
          <Icon name="close" size={20} color={COLORS.darkgray} />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },

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

export default RecommandScreen;
