import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import CoinDetailScreen from './src/screens/CoinDetailScreen';
import ChatScreen from './src/screens/ChatScreen';
import BacktestScreen from './src/screens/BacktestScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ title: 'Crypto Insights' }}
    />
    <Stack.Screen 
      name="CoinDetail" 
      component={CoinDetailScreen} 
      options={{ title: 'Coin Details' }}
    />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: '#666',
        }}
      >
        <Tab.Screen 
          name="HomeTab" 
          component={HomeStack} 
          options={{ 
            title: 'Market',
            headerShown: false,
          }}
        />
        <Tab.Screen 
          name="Chat" 
          component={ChatScreen} 
          options={{ title: 'AI Chat' }}
        />
        <Tab.Screen 
          name="Backtest" 
          component={BacktestScreen} 
          options={{ title: 'Backtest' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
