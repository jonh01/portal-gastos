import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import {Provider} from 'react-redux';
import Routes from './src/routes';
import CarregamentoIni from './src/components/CarregamentoIni';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<CarregamentoIni/>} persistor={persistor}>
        <PaperProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </SafeAreaProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;