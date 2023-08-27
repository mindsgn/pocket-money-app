/**
 * @format
 */
import './shim';
import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

LogBox.ignoreLogs(['Task orphaned for request', 'Require cycle']);

AppRegistry.registerComponent(appName, () => App);
