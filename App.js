import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/store/store';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default App = () => {
    return (
        <Provider store={store}>
            <AppNavigator />
            <StatusBar style="auto" />
        </Provider>
    );
};
