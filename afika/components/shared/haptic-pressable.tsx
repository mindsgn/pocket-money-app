import React from 'react';
import { Pressable } from 'react-native';
import { withHaptic, HapticType } from '@/lib/haptics';

type HapticPressableProps = React.ComponentProps<typeof Pressable> & {
  hapticType?: HapticType;
};

export const HapticPressable: React.FC<HapticPressableProps> = ({
  onPress,
  hapticType = 'light',
  ...rest
}) => {
  const handlePress = onPress ? withHaptic(onPress, hapticType) : undefined;
  return <Pressable onPress={handlePress} {...rest} />;
};
