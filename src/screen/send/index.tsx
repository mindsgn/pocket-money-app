import React from 'react';
import { View } from 'react-native';
import { style } from './style';
import {
  WalletCard,
  TokenContainer,
  AddToken,
  TokenBottomSheet
} from '../../components';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Home = (props: any) => {
  const { navigation } = props;
  const bottomSheetY = useSharedValue(-200);
  const backgroundY = useSharedValue(-1000);
  const backgroundOpacity = useSharedValue(0);

  const openBottomSheet = (number: any) => {
    backgroundY.value = withTiming(0, {duration: 200});
    bottomSheetY.value = withTiming(0, {duration: 500});
    backgroundOpacity.value = withTiming(1, {duration: 100})
  }

  const closeBottomSheet = (number: any) => {
    backgroundY.value = withTiming(-1000, {duration: 500});
    bottomSheetY.value = withTiming(-200, {duration: 200});
    backgroundOpacity.value = withTiming(0, {duration: 100})
  }

  const bottomSheetStyle = useAnimatedStyle(() => {
    return {
      bottom: bottomSheetY.value,
    };
  }, []);

  const backgroundStyle = useAnimatedStyle(() => {
    return {
      bottom: backgroundY.value,
      opacity: backgroundOpacity.value,
    };
  }, []);

  return (
    <View style={style.default}>
      <WalletCard />
      <TokenContainer 
        navigation={navigation} />
      {/*<AddToken onPress={openBottomSheet} />
      <TokenBottomSheet
        backgroundStyle={backgroundStyle}
        closeBottomSheet={closeBottomSheet} 
        bottomSheetStyle={bottomSheetStyle}
        />*/}
    </View>
  );
};

export { Home };
