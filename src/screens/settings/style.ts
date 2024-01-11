import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  default: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    paddingBottom: 100,
  },
  account: {
    display: 'flex',
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    borderRadius: 50,
  },
});
