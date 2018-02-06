import { Text } from 'react-native';
import appConfig from './appConfig';
import './console';

// Allow/disallow font-scaling in app
Text.defaultProps.allowFontScaling = appConfig.allowTextFontScaling;
