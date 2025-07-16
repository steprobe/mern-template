import { useTranslation as useTranslationOriginal } from 'react-i18next';

export const useTranslation = () => {
  const { t, i18n } = useTranslationOriginal();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return {
    t,
    i18n,
    changeLanguage,
    currentLanguage: i18n.language,
  };
};

export default useTranslation;
