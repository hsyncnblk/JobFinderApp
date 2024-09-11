import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query'
import { I18nextProvider } from 'react-i18next';
import i18n from './translation/index';
import { SearchContext, SearchProvider } from './context/SearchContext';
import { ProfileProvider } from './context/ProfileDataContext';

const queryClient = new QueryClient();


const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <SearchProvider>
          <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
              <ProfileProvider>
                <AppNavigator />
              </ProfileProvider>
            </QueryClientProvider>
          </SafeAreaProvider>
        </SearchProvider>
      </AuthProvider>
    </I18nextProvider>
  );
};

export default App;