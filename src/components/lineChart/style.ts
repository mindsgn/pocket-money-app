import { colors, text } from '../../constants';
import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  default: {
    flex: 1,
    backgroundColor: "none",
  },
  summary: {
    flex: 1,
  },
  chart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: -50
  },
});