import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './screens/Home';
import Detail from './screens/Detail';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer >
        <StatusBar style='light' />
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerStyle: {
              backgroundColor: '#212529'

            },
            headerShadowVisible: true,
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}>
          <Stack.Screen name='Home' component={Home} options={{ title: 'IMDb', headerTintColor: '#FFC107' }} />
          <Stack.Screen name='Detail' component={Detail} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}