import i18n from 'react-native-i18n';
import zh from '../../assets/lang/zh';
import en from './../../assets/lang/en';


i18n.defaultLocale = 'en';
i18n.fallbacks = true;
i18n.translations = {
  zh,
  en,
};

export {i18n};