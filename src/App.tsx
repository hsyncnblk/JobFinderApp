import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { I18nextProvider } from 'react-i18next';
import i18n from './translation/index';

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </I18nextProvider>
  );
};

export default App;