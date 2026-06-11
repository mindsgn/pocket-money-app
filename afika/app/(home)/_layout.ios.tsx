import { colors } from "@/constants";
import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" selectedColor={colors.primary}/>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="account">
        <NativeTabs.Trigger.Label></NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="person.fill" selectedColor={colors.primary}/>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="smart">
        <NativeTabs.Trigger.Label></NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="person" selectedColor={colors.primary}/>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
