import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './screens/Home';
import Detail from './screens/Detail';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer >
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerStyle: {
              backgroundColor: '#000'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Detail' component={Detail} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}