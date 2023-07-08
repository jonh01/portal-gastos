import { PaperProvider } from 'react-native-paper';
import { useAppSelector } from './src/@types/reduxHooks';
import { darkTheme, defaultTheme } from './src/theme/Theme';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import {Provider} from 'react-redux';
import Routes from './src/routes';
import CarregamentoIni from './src/components/CarregamentoIni';

const Main = () => {
  const isThemeDark = useAppSelector(state => state.theme.isThemeDark);

  let theme = isThemeDark ? darkTheme : defaultTheme;
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Routes />
      </NavigationContainer>
    </PaperProvider>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<CarregamentoIni/>} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
};

export default App;